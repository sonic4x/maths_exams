let delayed;

export const precisionChartData = {
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
