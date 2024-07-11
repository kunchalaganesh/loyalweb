import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useInView } from "react-intersection-observer";

export default function GSPerformanceChart() {
  // Define state for the visibility of each chart
  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Define state for the series values of each chart
  const [series1, setSeries1] = useState([0]);
  const [series2, setSeries2] = useState([0]);
  const [series3, setSeries3] = useState([0]);

  // Chart options can be defined outside of the component or state if they don't change
  const chartOptions = {
    chart: {
      height: 230,
      type: "radialBar",
    },
    colors: ["#6dc41b"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "80%",
          background: "white",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            color: "#fff",
            fontSize: "13px",
            show: false,
          },
          value: {
            color: "black",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  useEffect(() => {
    if (inView1) {
      const timer = setTimeout(() => setSeries1([75]), 300); // Final value for chart 1
      return () => clearTimeout(timer);
    }
  }, [inView1]);

  useEffect(() => {
    if (inView2) {
      const timer = setTimeout(() => setSeries2([85]), 300); // Final value for chart 2
      return () => clearTimeout(timer);
    }
  }, [inView2]);

  useEffect(() => {
    if (inView3) {
      const timer = setTimeout(() => setSeries3([94]), 300); // Final value for chart 3
      return () => clearTimeout(timer);
    }
  }, [inView3]);

  return (
    <div className="gsHomePerformanceMainBox">
      <div ref={ref1} className="gsHomePerformanceItemsBox">
        <ReactApexChart
          options={chartOptions}
          series={series1}
          type="radialBar"
          height={250}
        />
        <p>Customizable features</p>
      </div>
      <div ref={ref2} className="gsHomePerformanceItemsBox">
        <ReactApexChart
          options={chartOptions}
          series={series2}
          type="radialBar"
          height={250}
        />
        <p>User experience</p>
      </div>
      <div ref={ref3} className="gsHomePerformanceItemsBox">
        <ReactApexChart
          options={chartOptions}
          series={series3}
          type="radialBar"
          height={250}
        />
        <p>Customer satisfaction</p>
      </div>
    </div>
  );
}
