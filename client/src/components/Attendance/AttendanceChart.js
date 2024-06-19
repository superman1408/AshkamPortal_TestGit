import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, withStyles } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const HalfDoughnutWithPointer = ({ totalHours }) => {
  // useEffect(() => {}, [totalHours]);
  const data = {
    labels: ["Worked Hours", "Scheduled Hours"],
    datasets: [
      {
        label: "Total working Hours",
        data: [totalHours, 8.5],
        // backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        backgroundColor: ["#e55d17", "#047682"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card
      sx={{
        padding: "10px",
        width: "200px",
        height: "200px",
        marginTop: "30px",
      }}
    >
      <Doughnut data={data} />
    </Card>
  );
};
export default HalfDoughnutWithPointer;
