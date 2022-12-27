<script>
import Chart from 'chart.js/auto'
import planetChartData from './planet-data.js'
import axios from 'axios';
import global_v from "./global_v";
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
            }
        }
    },
    mounted() {

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
