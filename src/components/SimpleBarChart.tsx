import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface DataItem {
  name: string;
  uv: number;
  pv: number;
}

const data: DataItem[] = [
  { name: 'January', uv: 45, pv: 15 },
  { name: 'February', uv: 30, pv: 25 },
  { name: 'March', uv: 35, pv: 30 },
  { name: 'April', uv: 50, pv: 45 },
  { name: 'May', uv: 60, pv: 20 },
  { name: 'June', uv: 30, pv: 40 },
  { name: 'August', uv: 45, pv: 35 },
  { name: 'September', uv: 20, pv: 10 },
];

const SimpleBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={650}>
      <BarChart
        data={data}
        barGap={20} 
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis dataKey="name" axisLine={false}/>
        <YAxis axisLine={false}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#007bff" barSize={20}/>
        <Bar dataKey="pv" fill="#ff4136" barSize={20}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
