const labels =  ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]
const data_value = [0, 0, 1, 2, 79, 82, 27, 14]
export const planetChartData = {
    // type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Number of Moons",
          type:"line",
          data: data_value,
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3,
          fill:false,
          tension: 0.1 // line have a slight curve
        },
        // {
        //   label: "Planetary Mass (relative to the Sun x 10^-6)",
        //   type:"bar",
        //   data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
        //   backgroundColor: "rgba(71, 183,132,.5)",
        //   borderColor: "#47b784",
        //   borderWidth: 3
        // }
      ]
    },
    options: {
      responsive: true,
    //   lineTension: 1,
      
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      },
      scales: {
        y: {
            title: {
                display: true,
                text: 'Value'
            },
            min: 0,
            max: 100,
            ticks: {
            // forces step size to be 50 units
                stepSize: 2
            }
        }
      }
    }
  };
  
  export default planetChartData;
