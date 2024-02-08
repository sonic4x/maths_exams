import React from "react";
import { useState, useCallback, useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import global_v from "./global_v";

import { durationChartData } from "./duration_chart_data";
import { precisionChartData } from "./precision_chart_data";

import "./MainArea.css";

import { Radio } from "antd";

const history_options = [
  {
    label: "近一周",
    value: 7,
  },
  {
    label: "近一月",
    value: 30,
  },
  {
    label: "近三月",
    value: 90,
  },
  {
    label: "近半年",
    value: 180,
  },
  {
    label: "近一年",
    value: 365,
  },
];

let duration_chart;
let precision_chart;

function History(props) {
  const [historyOptions, setHistoryOptions] = useState(7);

  const onChangeHistoryOption = ({ target: { value } }) => {
    if (historyOptions !== value) {
      setHistoryOptions(value);
      chartsRef();
    }
  };

  const chartsRef = useCallback(
    (wrapper) => {
      if (wrapper == null) {
        // console.log("wrapper is null");
        return;
      }
      if (duration_chart instanceof Chart) {
        duration_chart.destroy();
      }
      if (precision_chart instanceof Chart) {
        precision_chart.destroy();
      }

      const path = global_v.api_server +"/api/history";
      console.log("option: " + historyOptions);
      axios
        .post(path, {
          option: historyOptions,
        })
        .then((res) => {
          durationChartData.data.labels = res.data["date_values"];
          durationChartData.data.datasets[0].data = res.data["duration_values"];
          const ctx_duration = document.getElementById("duration-chart");
          duration_chart = new Chart(ctx_duration, durationChartData);

          precisionChartData.data.labels = res.data["date_values"];
          precisionChartData.data.datasets[0].data =
            res.data["precision_values"];
          const ctx_precision = document.getElementById("precision-chart");
          precision_chart = new Chart(ctx_precision, precisionChartData);
        });
    },
    [historyOptions]
  );

  useEffect(() => {
    console.log("useEffect chart");
    chartsRef();
  }, [historyOptions, chartsRef]);

  return (
    <>
      <div className='chart-options'>
        <Radio.Group
          options={history_options}
          onChange={onChangeHistoryOption}
          value={historyOptions}
          optionType='button'
        />
      </div>
      <div className='chart' ref={chartsRef}>
        <canvas id='duration-chart'></canvas>
        <canvas id='precision-chart'></canvas>
      </div>
    </>
  );
}

export default History;
