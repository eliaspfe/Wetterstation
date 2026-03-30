import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 30, real: 1000 },
  { name: 'Feb', value: 50, real: 60 },
  { name: 'Mär', value: 40, real: 70 },
];

export default function Chart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" label={{value: 'Zeit', position: 'insideRight', dy: 15, dx: 10, style: {fontSize: 12}}}/>
          <YAxis label={{ value: 'Temperatur °C', angle: -90, position: 'middle', style: { fontSize: 12 }, dx: -15 }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Temperatur °C" />
          {/* <Line type="monotone" dataKey="real" stroke="#f63b3b" name="Referenzdaten" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}