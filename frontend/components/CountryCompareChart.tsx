"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: 'China', Production: 60, Processing: 85, Risk: 80 },
  { name: 'USA', Production: 14, Processing: 5, Risk: 40 },
  { name: 'Australia', Production: 9, Processing: 0, Risk: 30 },
];

export default function CountryCompareChart() {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] glass-card p-4 w-[380px]">
      <h3 className="section-label mb-2">Country Compare</h3>
      <div className="h-[220px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
            <RechartsTooltip 
              cursor={{ fill: 'rgba(56, 189, 248, 0.05)' }}
              contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937', fontSize: '12px', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#9CA3AF' }} />
            <Bar dataKey="Production" fill="#38BDF8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Processing" fill="#818CF8" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Risk" fill="#F87171" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
