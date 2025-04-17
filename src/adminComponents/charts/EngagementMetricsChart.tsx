import React from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const EngagementMetricsChart = () => {
  const data = [
    { day: "Mon", engagement: 300 },
    { day: "Tue", engagement: 400 },
    { day: "Wed", engagement: 350 },
    { day: "Thu", engagement: 500 },
    { day: "Fri", engagement: 450 },
    { day: "Sat", engagement: 600 },
    { day: "Sun", engagement: 700 },
  ];

  return (
    <AreaChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="engagement"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
  );
};

export default EngagementMetricsChart;
