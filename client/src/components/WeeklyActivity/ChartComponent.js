// ChartComponent.js
import React from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ chartData }) => {
  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartComponent;
