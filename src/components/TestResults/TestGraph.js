import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { Typography } from '@mui/material';

export const TestGraph = () => {
  const data = [
    { name: 'Pass', Fail: 4000, pass: 2400, amt: 2400 },
    { name: 'Fail', Fail: 3000, pass: 1398, amt: 2210 },
    { name: 'In Progress', Fail: 2000, pass: 9800, amt: 2290 },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Test case result summary
      </Typography>
      <BarChart width={1100} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pass" fill="#EC1944" barSize={20} />
        <Bar dataKey="Fail" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default TestGraph;
