from fastapi import FastAPI
import duckdb
from fastapi.middleware.cors import CORSMiddleware

DB_PATH = "wetterstation.duckdb"


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
sample_inserts()
origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/measurements")
def get_measurements():
    conn = duckdb.connect(DB_PATH)
    result = conn.execute("SELECT * FROM measurements ORDER BY timestamp").fetchall()
    conn.close()

    # Umwandeln in dicts und timestamp in ms
    measurements = []
    for row in result:
        # row: (id, timestamp, temperature, humidity, pressure, light)
        ts = int(row[1].timestamp() * 1000)  # timestamp in ms
        measurements.append(
            {
                "id": row[0],
                "timestamp": ts,
                "temperature": row[2],
                "humidity": row[3],
                "pressure": row[4],
                "light": row[5],
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


@app.post("/upload")
def upload_measurement(
    temperature: float, humidity: float, pressure: float, light: int
):
    # Insert a new measurement into the database
    conn = duckdb.connect(DB_PATH)
    conn.execute(
        """
        INSERT INTO measurements (timestamp, temperature, humidity, pressure, light)
        VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?)
    """,
        (temperature, humidity, pressure, light),
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


if __name__ == "__main__":
    # Run the FastAPI app
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
