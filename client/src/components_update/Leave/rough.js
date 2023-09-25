import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const ChartComponent = () => {
  useEffect(() => {
    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;

    chart.legend = new am4charts.Legend();

    // chart.alignLabels = false;

    chart.data = [
      {
        name: "Available",
        status: 10,
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
    series.labels.template.text = "{category} : {value.formatNumber('#.0')}";
    series.labels.template.radius = am4core.percent(5);
    // series.labels.template.fill = am4core.color("white");

    return () => {
      chart.dispose(); // Cleanup when the component unmounts
    };
  }, []);

  return (
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
  );
};

export default ChartComponent;
// }
