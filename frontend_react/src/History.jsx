import React from "react";
import { useCallback } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import global_v from "./global_v";

import { durationChartData } from "./duration_chart_data";
import { precisionChartData } from "./precision_chart_data";

import "./MainArea.css";

// let delayed;
let durationChart;
let precisionChart;
function History(props) {
  const chartsRef = useCallback((wrapper) => {
    if (wrapper == null) {
      console.log("wrapper is null");
      return;
    }
    const path = "http://" + global_v.api_server + ":5000/api/history";
    axios
      .post(path, {
        option: 0,
      })
      .then((res) => {
        durationChartData.data.labels = res.data["date_values"];
        durationChartData.data.datasets[0].data = res.data["duration_values"];
        const ctx_duration = document.getElementById("duration-chart");
        durationChart = new Chart(ctx_duration, durationChartData);

        precisionChartData.data.labels = res.data["date_values"];
        precisionChartData.data.datasets[0].data = res.data["precision_values"];
        const ctx_precision = document.getElementById("precision-chart");
        precisionChart = new Chart(ctx_precision, precisionChartData);
      });
  }, []);

  return (
    <div className='chart' ref={chartsRef}>
      <canvas id='duration-chart'></canvas>
      <canvas id='precision-chart'></canvas>
    </div>
  );
}

export default History;