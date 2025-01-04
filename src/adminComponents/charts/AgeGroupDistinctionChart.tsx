import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from "recharts";

const AgeGroupDistributionChart = () => {
  const data = [
    { ageGroup: "18-24", users: 120 },
    { ageGroup: "25-34", users: 200 },
    { ageGroup: "35-44", users: 150 },
    { ageGroup: "45-54", users: 80 },
    { ageGroup: "55+", users: 50 },
  ];

  return (
    <RadarChart outerRadius={90} width={400} height={400} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="ageGroup" />
      <PolarRadiusAxis />
      <Tooltip />
      <Radar
        name="Users"
        dataKey="users"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default AgeGroupDistributionChart;
