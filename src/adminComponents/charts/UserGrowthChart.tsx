import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const UserGrowthChart = () => {
  const data = [
    { month: "Jan", activeUsers: 400, newUsers: 200 },
    { month: "Feb", activeUsers: 800, newUsers: 300 },
    { month: "Mar", activeUsers: 1200, newUsers: 500 },
    { month: "Apr", activeUsers: 1600, newUsers: 700 },
    { month: "May", activeUsers: 2000, newUsers: 1000 },
  ];

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" />
      <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" />
    </LineChart>
  );
};

export default UserGrowthChart;
