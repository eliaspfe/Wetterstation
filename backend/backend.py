from fastapi import FastAPI, Query
import duckdb
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pandas as pd
from fastapi.responses import StreamingResponse
import io

DB_PATH = "data/wetterstation.duckdb"


def init_db():
    # Initialize the DuckDB database and create the table if it doesn't exist
    conn = duckdb.connect(DB_PATH)
    conn.execute(
        """
        CREATE SEQUENCE IF NOT EXISTS measure_id START 1;

        CREATE TABLE IF NOT EXISTS measurements (
            id INTEGER PRIMARY KEY DEFAULT nextval('measure_id'),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            temperature DOUBLE,
            humidity DOUBLE,
            pressure DOUBLE,
            light integer
        );

    """
    )
    conn.close()


def sample_inserts():
    conn = duckdb.connect(DB_PATH)
    conn.execute(
        """
        INSERT INTO measurements (timestamp, temperature, humidity, pressure, light)
        VALUES 
        ('2026-03-30 02:00:00', 25.5, 60.0, 1013.25, 300),
        ('2026-03-30 03:00:00', 26.0, 58.0, 1012.80, 320),
        ('2026-03-30 04:00:00', 24.8, 62.0, 1013.50, 280),
        ('2026-03-30 05:00:00', 27.2, 55.0, 1011.90, 350),
        ('2026-03-30 06:00:45', 23.5, 65.0, 1014.00, 250),
        ('2026-03-30 07:00:00', 22.0, 70.0, 1014.50, 200),
        ('2026-03-30 08:00:00', 28.0, 50.0, 1010.75, 400),
        ('2026-03-30 09:00:32', 24.0, 60.0, 1013.00, 300),
        ('2026-03-30 09:00:33', 26.5, 57.0, 1012.25, 320);
    """
    )
    conn.close()


app = FastAPI()
init_db()
# sample_inserts()
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/measurements")
def get_measurements(
    trunc: str = Query("hour", description="second, minute, hour, day, week, month")
):
    conn = duckdb.connect(DB_PATH)

    query = f"""
            SELECT
                MIN(id) AS id,
                DATE_TRUNC('{trunc}', timestamp) AS ts,
                EPOCH_MS(DATE_TRUNC('{trunc}', timestamp) AT TIME ZONE 'Europe/Berlin') AS ts_ms,
                AVG(temperature) AS temperature,
                AVG(humidity) AS humidity,
                AVG(pressure) AS pressure,
                AVG(light) AS light
            FROM measurements
            GROUP BY ts
            ORDER BY ts
        """

    result = conn.execute(query).fetchall()
    conn.close()

    measurements = []
    for row in result:
        measurements.append(
            {
                "id": row[0],
                "timestamp": row[2],  # bereits ms!
                "temperature": row[3],
                "humidity": row[4],
                "pressure": row[5],
                "light": row[6],
            }
        )

    return {"measurements": measurements}

    # example response:
    # {
    #     "measurements": [
    #         {
    #             "id": 1,
    #             "timestamp": "2024-06-01T12:00:00",
    #             "temperature": 25.5,
    #             "humidity": 60.0,
    #             "pressure": 1013.25,
    #             "light": 300
    #         },
    #         {
    #             "id": 2, ...


@app.get("/download_excel")
def download_excel():
    conn = duckdb.connect(DB_PATH)
    result = conn.execute("SELECT * FROM measurements ORDER BY timestamp").fetchall()
    conn.close()

    # Umwandeln in CSV-Format
    csv_data = "id,timestamp,temperature,humidity,pressure,light\n"
    for row in result:
        csv_data += f"{row[0]},{row[1]},{row[2]},{row[3]},{row[4]},{row[5]}\n"

    # create a excel file from the csv data and return it as a response

    excel_file = io.BytesIO()

    df = pd.read_csv(io.StringIO(csv_data))
    df.to_excel(excel_file, index=False)
    excel_file.seek(0)
    return StreamingResponse(
        excel_file,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=measurements.xlsx"},
    )


class Measurement(BaseModel):
    temperature: float
    humidity: float
    pressure: float
    light: int


@app.post("/upload")
def upload_measurement(data: Measurement):
    conn = duckdb.connect(DB_PATH)
    conn.execute(
        """
        INSERT INTO measurements (timestamp, temperature, humidity, pressure, light)
        VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?)
    """,
        (data.temperature, data.humidity, data.pressure, data.light),
    )
    conn.close()
    return {"message": "Measurement uploaded successfully"}

    # example request:
    # POST /upload
    # {
    #     "temperature": 25.5,
    #     "humidity": 60.0,
    #     "pressure": 1013.25,
    #     "light": 300
    # }

    # stats


#     const stats = [
#   { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
#   { id: 2, name: 'Assets under holding', value: '$119 trillion' },
#   { id: 3, name: 'New users annually', value: '46,000' },
# ]


@app.get("/stats")
def get_stats():
    # Anzahl der Messsungen, Datun der letzten Messung, Anzahl Spalten
    conn = duckdb.connect(DB_PATH)
    count = conn.execute("SELECT COUNT(*) FROM measurements").fetchone()[0]
    last_timestamp = conn.execute("SELECT MAX(timestamp) FROM measurements").fetchone()[
        0
    ]
    column_count = conn.execute(
        "SELECT COUNT(*) FROM information_schema.columns WHERE table_name='measurements'"
    ).fetchone()[0]
    conn.close()

    return {
        "stats": [
            {"id": 1, "name": "Total Measurements", "value": str(count)},
            {
                "id": 2,
                "name": "Last Measurement Timestamp",
                "value": (
                    last_timestamp.strftime("%d.%m.%Y") if last_timestamp else None
                ),
            },
            {"id": 3, "name": "Number of Columns", "value": str(column_count)},
        ]
    }


if __name__ == "__main__":
    # Run the FastAPI app
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
