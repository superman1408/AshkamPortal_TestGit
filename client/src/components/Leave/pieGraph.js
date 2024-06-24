import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Card } from "@mui/material";

am4core.useTheme(am4themes_animated);

const ChartComponent = ({ currentId, posts }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  // Find the current post based on currentId
  const currentPost = posts.find((post) => post._id === currentId);

  useEffect(() => {
    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.data = [
      {
        name: "Casual Leave",
        status: currentPost?.CL,
      },
      {
        name: "Sick Leave",
        status: currentPost?.SL,
      },
      {
        name: "Privilege Leave",
        status: currentPost?.PL,
      },
      {
        name: "Floating Leave",
        status: currentPost?.FL,
      },
      {
        name: "C off",
        status: currentPost?.Coff,
      },
    ];

    chart.innerRadius = 30;

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "status";
    series.dataFields.category = "name";

    series.ticks.template.disabled = false;
    series.alignLabels = false;
    series.labels.template.text = "";
    series.labels.template.radius = am4core.percent(5);

    series.labels.template.disabled = true;

    // Customize tooltip
    series.slices.template.tooltipText = "{category}: [bold]{value}";

    const legend = new am4charts.Legend();
    legend.labels.template.fontSize = 12; // Set font size here
    legend.position = "right"; // Set legend position
    legend.labels.template.textAlign = "start"; // Align text to start (left) of the label area
    legend.labels.template.html = "{category} : [ {value} ]"; // Customize legend label format

    chart.legend = legend;

    return () => {
      chart.dispose(); // Cleanup when the component unmounts
    };
  }, [currentPost]);

  return (
    <>
      <Card
        id="chartdiv"
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "200px", // Adjusted height
          marginTop: "10px",
        }}
      />
    </>
  );
};

export default ChartComponent;
