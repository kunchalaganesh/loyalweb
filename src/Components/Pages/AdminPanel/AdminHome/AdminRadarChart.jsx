import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function AdminRadarChart() {
  const [chartData] = useState({
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 60, 20],
      },
      {
        name: "Series 2",
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: "Series 3",
        data: [44, 76, 78, 13, 43, 10],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radar"
        height={300}
      />
    </div>
  );
}
