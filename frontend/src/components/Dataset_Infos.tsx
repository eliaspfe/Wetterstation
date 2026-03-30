import { useEffect, useState } from 'react';


interface Stats {
    id: number;
    name: string;
    value: string;
}



export default function Stats() {
    const [stats, setStats] = useState<Stats[]>([]);    
    useEffect(() => {
        fetch('http://backend:8000/stats')
          .then(res => res.json())
            .then(json => {
                setStats(json.stats);
          })
          .catch(console.error);
      }, []);
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}