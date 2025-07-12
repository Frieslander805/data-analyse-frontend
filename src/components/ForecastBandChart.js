// src/components/ForecastBandChart.js
import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

export default function ForecastBandChart({ data, next, peak }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={v => v} />
        <Legend />
        <Line type="monotone" dataKey="qty" name="Daily Sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
