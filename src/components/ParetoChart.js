import React from "react";
import {
  ResponsiveContainer, BarChart, Bar, Line,
  XAxis, YAxis, Tooltip, Legend
} from "recharts";

export default function ParetoChart({ data }) {
  const sorted = [...data].sort((a,b)=>b.profit-a.profit);
  const total  = sorted.reduce((s,i)=>s+i.profit,0);
  let cum=0;
  const pd = sorted.map(i=>{
    cum+=i.profit;
    return {product:i.product, profit:i.profit, cumPct:(cum/total)*100};
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={pd}>
        <XAxis dataKey="product"/>
        <YAxis yAxisId="left"/>
        <YAxis yAxisId="right" orientation="right" domain={[0,100]} tickFormatter={v=>`${v.toFixed(0)}%`}/>
        <Tooltip formatter={(v,n)=>n==="cumPct"?`${v.toFixed(1)}%`:`€${v.toLocaleString()}`}/>
        <Legend/>
        <Bar yAxisId="left" dataKey="profit" name="Profit" fill="#8884d8"/>
        <Line yAxisId="right" dataKey="cumPct" name="Cumulative %" stroke="#ff7300" dot={false}/>
      </BarChart>
    </ResponsiveContainer>
  );
}
