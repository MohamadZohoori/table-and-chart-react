import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface DataItem {
  name: string;
  nameAlt: string;
  uv: number;
  pv: number;
}

const data: DataItem[] = [
  { name: 'January', nameAlt: 'Jan', uv: 45, pv: 15 },
  { name: 'February', nameAlt: 'Feb', uv: 30, pv: 25 },
  { name: 'March', nameAlt: 'Mar', uv: 35, pv: 30 },
  { name: 'April', nameAlt: 'Apr', uv: 50, pv: 45 },
  { name: 'May', nameAlt: 'May', uv: 60, pv: 20 },
  { name: 'June', nameAlt: 'Jun', uv: 30, pv: 40 },
  { name: 'August', nameAlt: 'Aug', uv: 45, pv: 35 },
  { name: 'September', nameAlt: 'Sep', uv: 20, pv: 10 },
];

const SimpleBarChart: React.FC = () => {
  const [xAxisKey, setXAxisKey] = useState<'name' | 'nameAlt'>('nameAlt');
  const [barGap, setBarGap] = useState(10); 
  const [barSize, setBarSize] = useState(20); 


  const updateChartConfig = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setXAxisKey('nameAlt'); 
      setBarGap(5); 
      setBarSize(10);
    } else {
      setXAxisKey('name'); 
      setBarGap(20); 
      setBarSize(20);
    }
  };

  useEffect(() => {
    updateChartConfig();

    window.addEventListener('resize', updateChartConfig);
    return () => {
      window.removeEventListener('resize', updateChartConfig);
    };
  }, []);

  return (
    <ResponsiveContainer width="100%" height={650}>
      <BarChart
        data={data}
        barGap={barGap} 
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey={xAxisKey} axisLine={false} className="text-xs md:text-lg" />
        <YAxis axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#007bff" barSize={barSize} />
        <Bar dataKey="pv" fill="#ff4136" barSize={barSize} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
