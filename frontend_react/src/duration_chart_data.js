
let delayed;
export const durationChartData = {
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


  export default durationChartData;
