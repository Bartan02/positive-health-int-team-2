<html lang="en">

<head>
    <meta charset="UTF-8">
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.6.0/tailwind.min.css'>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css'>

</head>

<body>
    <!-- partial:index.partial.html -->
    <div class="min-w-screen bg-orange-500 flex items-center justify-center px-5 py-5 rounded-lg">
        <div class="w-full max-w-3xl">
            <div class="-mx-2 md:flex">
                <div class="w-full md:w-1/3 px-2">
                    <div class="rounded-lg shadow-sm mb-2">
                        <div class="rounded-lg bg-white shadow-lg md:shadow-xl overflow-hidden">
                            <div class="px-3 pt-8 pb-10 text-center z-10">
                                <h4 class="text-sm uppercase text-gray-600 leading-tight">Distance</h4>
                                <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">10 km</h3>
                                <p class="text-xs text-green-500 leading-tight">▲ 12.1%</p>
                            </div>
                            <div class="absolute bottom-0 inset-x-0">
                                <canvas id="chart1" height="70"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3 px-2">
                    <div class="rounded-lg shadow-sm mb-2">
                        <div class="rounded-lg bg-white shadow-lg md:shadow-xl overflow-hidden">
                            <div class="px-3 pt-8 pb-10 text-center z-10">
                                <h4 class="text-sm uppercase text-gray-600 leading-tight">Age Speed</h4>
                                <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">11 km/h</h3>
                                <p class="text-xs text-red-500 leading-tight">▼ 8.8%</p>
                            </div>
                            <div class="absolute bottom-0 inset-x-0">
                                <canvas id="chart2" height="70"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-1/3 px-2">
                    <div class="rounded-lg shadow-sm mb-2">
                        <div class="rounded-lg bg-white shadow-lg md:shadow-xl overflow-hidden">
                            <div class="px-3 pt-8 pb-10 text-center z-10">
                                <h4 class="text-sm uppercase text-gray-600 leading-tight">Sprint Distance</h4>
                                <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">0,9 km</h3>
                                <p class="text-xs text-green-500 leading-tight">▲ 8.2%</p>
                            </div>
                            <div class="absolute bottom-0 inset-x-0">
                                <canvas id="chart3" height="70"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- partial -->
    <script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js'></script>
    <script>
        const chartOptions = {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
            },
            elements: {
                point: {
                    radius: 0
                },
            },
            scales: {
                xAxes: [{
                    gridLines: false,
                    scaleLabel: false,
                    ticks: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: false,
                    scaleLabel: false,
                    ticks: {
                        display: false,
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                }]
            }
        };

        let ctx, chart;

        ctx = document.getElementById('chart1').getContext('2d');
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [1, 2, 1, 3, 5, 4, 7],
                datasets: [{
                    backgroundColor: "rgba(101, 116, 205, 0.1)",
                    borderColor: "rgba(101, 116, 205, 0.8)",
                    borderWidth: 2,
                    data: [1, 2, 1, 3, 5, 4, 7],
                }, ],
            },
            options: chartOptions
        });

        ctx = document.getElementById('chart2').getContext('2d');
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [2, 3, 2, 9, 7, 7, 4],
                datasets: [{
                    backgroundColor: "rgba(246, 109, 155, 0.1)",
                    borderColor: "rgba(246, 109, 155, 0.8)",
                    borderWidth: 2,
                    data: [2, 3, 2, 9, 7, 7, 4],
                }, ],
            },
            options: chartOptions
        });

        ctx = document.getElementById('chart3').getContext('2d');
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [2, 5, 1, 3, 2, 6, 7],
                datasets: [{
                    backgroundColor: "rgba(246, 153, 63, 0.1)",
                    borderColor: "rgba(246, 153, 63, 0.8)",
                    borderWidth: 2,
                    data: [2, 5, 1, 3, 2, 6, 7],
                }, ],
            },
            options: chartOptions
        });
    </script>

</body>

</html>