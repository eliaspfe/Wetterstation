import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';

interface Measurement {
  id: number;
  timestamp: string;      // ISO-String vom Backend
  temperature: number;
  humidity: number;
  pressure: number;
  light: number;
}

interface ChartPoint {
  timestamp: string;      // direkt vom Backend
  temperature: number;
}


export default function ChartPres() {
const [data, setData] = useState<ChartPoint[]>([]);    

  useEffect(() => {
    fetch('/measurements')
      .then(res => res.json())
      .then(json => {
        // Direkt übernehmen, Timestamp bleibt String
        const chartData: ChartPoint[] = json.measurements.map((m: Measurement) => ({
          timestamp: m.timestamp,
          pressure: m.pressure
        }));
        setData(chartData);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={(ts) => {
              // Format: HH:mm oder Tag + Stunde
              const d = new Date(ts);
              return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`;
            }} label={{value: 'Zeit', position: 'insideRight', dy: 15, dx: 10, style: {fontSize: 12}}}/>
          <YAxis label={{ value: 'Luftdruck Pa', angle: -90, position: 'middle', style: { fontSize: 12 }, dx: -15 }}/>
          <Tooltip labelFormatter={(ts) => {
              // Tooltip zeigt komplette Zeit
              const d = new Date(ts);
              return d.toLocaleString("de-DE");
            }}/>
          <Legend />
          <Line type="monotone" dataKey="pressure" stroke="#3b82f6" name="Luftdruck in Pa" />
          {/* <Line type="monotone" dataKey="real" stroke="#f63b3b" name="Referenzdaten" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}