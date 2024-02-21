import React, { useState, useEffect } from "react";

import Chart from "chart.js/auto";

const Analysis = ({ entries, projectCode }) => {

  
  useEffect(() => {
    calculateAnalytics(); // Call calculateAnalytics whenever entries are updated
  }, [entries]);

  const calculateAnalytics = () => {
    // Example: Calculate total net time and overtime for each project
    const projectData = {};
    entries.forEach((entry) => {
      if (!projectData[entry.projectCode]) {
        projectData[entry.projectCode] = { netTime: 0, overTime: 0 };
      }
      projectData[entry.projectCode].netTime += entry.netTime;
      projectData[entry.projectCode].overTime += entry.overTime;
    });

    // Once you have analyzed the data, you can use it to create a chart
    createChart(projectData);
  };

  const createChart = (projectData) => {
    const ctx = document.getElementById("timeSheetChart");

    // Check if a chart instance already exists
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      // Destroy the existing chart
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(projectData),
        datasets: [
          {
            label: "Net Time",
            data: Object.values(projectData).map((data) => data.netTime),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Over Time",
            data: Object.values(projectData).map((data) => data.overTime),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <>
      <div>
        <canvas id="timeSheetChart"></canvas>
      </div>
    </>
  );
};

export default Analysis;
