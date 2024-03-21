import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const ChartComponent = ({ availabelLeave }) => {
  useEffect(() => {
    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.data = [
      {
        name: "Available",
        status: availabelLeave,
      },
      {
        name: "Total",
        status: 24,
      },
    ];

    chart.innerRadius = 40;

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "status";
    series.dataFields.category = "name";

    series.ticks.template.disabled = false;
    series.alignLabels = false;
    series.labels.template.text = "";
    series.labels.template.radius = am4core.percent(5);

    const legend = new am4charts.Legend();
    legend.labels.template.html = "<b>{category}</b> : [ {value} ]";
    chart.legend = legend;

    return () => {
      chart.dispose(); // Cleanup when the component unmounts
    };
  }, [availabelLeave]);

  return (
    <>
      <div
        id="chartdiv"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "220px",
          marginTop: "10px",
          marginLeft: "00px",
        }}
      />
    </>
  );
};

export default ChartComponent;
