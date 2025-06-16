import React, { useMemo } from "react";
import { Card } from "@mui/material";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const expectedTimes = {
  earlyLoginCutoff: "09:30",
  lateLoginThreshold: "09:40",
};

const timeToMinutes = (timeStr) => {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

const PunctualityRadarChart = ({ data }) => {
  const counts = useMemo(() => {
    let earlyLoginCount = 0;
    let onTimeLoginCount = 0;
    let lateLoginCount = 0;

    const earlyLoginCutoffMins = timeToMinutes(expectedTimes.earlyLoginCutoff);
    const lateLoginThresholdMins = timeToMinutes(
      expectedTimes.lateLoginThreshold
    );

    data.forEach((entry) => {
      const loginMins = timeToMinutes(entry.logIn);

      if (loginMins === null) return;

      if (loginMins < earlyLoginCutoffMins) {
        earlyLoginCount++;
      } else if (loginMins <= lateLoginThresholdMins) {
        onTimeLoginCount++;
      } else {
        lateLoginCount++;
      }
    });

    return { earlyLoginCount, onTimeLoginCount, lateLoginCount };
  }, [data]);

  if (!Array.isArray(data)) return <p>No data available.</p>;

  const { earlyLoginCount, onTimeLoginCount, lateLoginCount } = counts;

  const radarData = {
    labels: ["Early\n(< 9:30)", "On-Time\n(9:30–9:40)", "Late\n(> 9:40)"],

    datasets: [
      {
        label: "Login Distribution",
        data: [earlyLoginCount, onTimeLoginCount, lateLoginCount],
        backgroundColor:
          lateLoginCount > 3
            ? "rgba(255, 99, 132, 0.3)"
            : "rgba(82, 204, 119, 0.3)",
        backgborderroundColor: onTimeLoginCount > 3 ? "green" : "green",
        borderColor: lateLoginCount > 3 ? "red" : "green",
        borderWidth: 2,
        pointBackgroundColor: [
          "blue",
          "green",
          lateLoginCount > 3 ? "red" : "orange",
        ],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        angleLines: { color: "#ccc" },
        grid: { color: "#eee" },
        pointLabels: {
          font: { size: 12, weight: "bold" },
          color: "#444",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { size: 14, weight: "bold" },
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed.r} days`,
        },
      },
    },
  };

  return (
    // <Card sx={{ padding: "20px", marginTop: "30px" }}>
    <>
      <h5
        style={{
          fontFamily: "Roboto",
          fontWeight: "bold",
          margin: "5px",
          color: "#16355d",
          textAlign: "center",
        }}
      >
        Login Time Radar
      </h5>
      <div
        style={{
          padding: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          margin: "5px",
          backgroundColor: "#fff",
        }}
      >
        <Radar data={radarData} options={options} />
      </div>

      {lateLoginCount > 3 && (
        <p style={{ color: "red", textAlign: "center", fontWeight: "bold" }}>
          Warning: More than 3 late logins!
        </p>
      )}
    </>
    // </Card>
  );
};

export default PunctualityRadarChart;
