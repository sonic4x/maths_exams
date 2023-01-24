import React from "react";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import global_v from "./global_v";
import "./MainArea.css";

let delayed;

function History(props) {
  useEffect(() => {
    let durationChartData = {
      type: "line",
      data: {
        labels: [
          "Mercury",
          "Venus",
          "Earth",
          "Mars",
          "Jupiter",
          "Saturn",
          "Uranus",
        ], // will be override
        datasets: [
          {
            label: "过去几天做题有多快",
            data: [65, 59, 80, 81, 56, 55, 40], // will be override
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 200 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        plugins: {
          // title: {
          //     display: true,
          //     text: '做题历史轨迹'
          // }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "耗时",
            },
            min: 0,
            max: 1000,
          },
          x: {
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              // callback: function (val, index) {
              //     // Hide every 2nd tick label
              //     return index % 2 === 0 ? this.getLabelForValue(val) : '';
              // },
              color: "blue",
              autoSkip: true,
            },
          },
        },
      },
    };

    let precisionChartData = {
      type: "line",
      data: {
        labels: [], // will be override
        datasets: [
          {
            label: "过去几天做题正确率",
            data: [], // will be override
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 200 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "正确率%",
            },
            min: 0,
            max: 100,
            ticks: {
              // stepSize: 10,
              autoSkip: true,
            },
          },
          x: {
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              // callback: function (val, index) {
              //     // Hide every 2nd tick label
              //     return index % 2 === 0 ? this.getLabelForValue(val) : '';
              // },
              color: "blue",
              autoSkip: true,
            },
          },
        },
      },
    };
    delayed = false;
    const path = "http://" + global_v.api_server + ":5000/api/history";
    axios
      .post(path, {
        option: 0,
      })
      .then((res) => {
        durationChartData.data.labels = res.data["date_values"];
        durationChartData.data.datasets[0].data = res.data["duration_values"];
        const ctx_duration = document.getElementById("duration-chart");
        new Chart(ctx_duration, durationChartData);

        precisionChartData.data.labels = res.data["date_values"];
        precisionChartData.data.datasets[0].data = res.data["precision_values"];
        const ctx_precision = document.getElementById("precision-chart");
        new Chart(ctx_precision, precisionChartData);
      });
  });

  return (
    <div className='chart'>
      <canvas id='duration-chart'></canvas>
      <canvas id='precision-chart'></canvas>
    </div>
  );
}

export default History;
