<script>
import Chart from 'chart.js/auto'
import planetChartData from './planet-data.js'
import axios from 'axios';
import global_v from "./global_v";

let delayed;
export default {
    name: 'PlanetChart',
    data() {
        return {
            // planetChartData: planetChartData
            chartData: {
                type: 'line',
                data: {
                    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus"], // will be override
                    datasets: [{
                        label: '过去几天做题有多快',
                        data: [65, 59, 80, 81, 56, 55, 40],  // will be override
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    animation: {
                        onComplete: () => {
                            delayed = true;
                        },
                        delay: (context) => {
                            let delay = 0;
                            if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                delay = context.dataIndex * 200 + context.datasetIndex * 100;
                            }
                            return delay;
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: '做题历史轨迹'
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: '耗时'
                            },
                            min: 0,
                            max: 900,
                            ticks: {
                                stepSize: 60,
                                autoSkip: false,
                            }
                        },
                        x: {
                            ticks: {
                                // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                                // callback: function (val, index) {
                                //     // Hide every 2nd tick label
                                //     return index % 2 === 0 ? this.getLabelForValue(val) : '';
                                // },
                                color: 'blue',
                            }
                        }
                    }

                }
            }
        }
    },
    mounted() {
        delayed = false;
        const path = "http://" + global_v.api_server + ":5000/api/history";
        axios
            .post(path, {
                option: 0,
            })
            .then((res) => {
                this.chartData.data.labels = res.data["date_values"]
                this.chartData.data.datasets[0].data = res.data["duration_values"]
                const ctx = document.getElementById('planet-chart');
                new Chart(ctx, this.chartData);
            });
    }
};
</script>

<template>

    <div>
        <!-- display must be inline, very important-->
        <canvas id="planet-chart" style="display: inline; box-sizing:border-box;"></canvas>
    </div>

</template>

<style scoped>

</style>
