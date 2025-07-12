import React from "react";
import {
  ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend
} from "recharts";

export default function StackedCostChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="product"/>
        <YAxis/>
        <Tooltip formatter={v=>`€${v.toLocaleString()}`}/>
        <Legend/>
        <Bar dataKey="purchaseCost" stackId="a" name="Purchase Cost" fill="#413ea0"/>
        <Bar dataKey="storageCost"   stackId="a" name="Storage Cost"  fill="#ff6347"/>
      </BarChart>
    </ResponsiveContainer>
  );
}
