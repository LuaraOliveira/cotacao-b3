import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"];

export default function MultiLineChart({ data }) {
  // data: { SYMBOL: [{date, close}, ...], ... }
  const symbols = Object.keys(data);
  const allDatesSet = new Set();
  symbols.forEach(s => (data[s] || []).forEach(r => allDatesSet.add(r.date)));
  const allDates = Array.from(allDatesSet).sort();

  const chartData = allDates.map(date => {
    const row = { date };
    symbols.forEach(sym => {
      const item = (data[sym] || []).find(d => d.date === date);
      row[sym] = item ? item.close : null;
    });
    return row;
  });

  return (
    <div style={{ width: "100%", height: 420 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend verticalAlign="top" />
          {symbols.map((sym, idx) => (
            <Line
              key={sym}
              type="monotone"
              dataKey={sym}
              dot={false}
              stroke={colors[idx % colors.length]}
              strokeWidth={2}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
