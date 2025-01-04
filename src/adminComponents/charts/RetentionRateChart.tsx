import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

const RetentionRateChart = () => {
  const data = [
    { month: "Jan", retentionRate: 78 },
    { month: "Feb", retentionRate: 80 },
    { month: "Mar", retentionRate: 82 },
    { month: "Apr", retentionRate: 79 },
    { month: "May", retentionRate: 85 },
  ];

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="retentionRate" fill="#82ca9d" />
    </BarChart>
  );
};

export default RetentionRateChart;
