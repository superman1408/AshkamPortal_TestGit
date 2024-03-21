import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="projectCode" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="netTime" fill="#8884d8" name="Net Time (hrs)" />
          <Bar dataKey="overTime" fill="#82ca9d" name="Over Time (hrs)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
