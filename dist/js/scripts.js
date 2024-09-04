/*!
* Start Bootstrap - Bare v5.0.9 (https://startbootstrap.com/template/bare)
* Copyright 2013-2024 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
var myChart;

function resizeChart() {
    var ctx = document.getElementById('myChart').getContext('2d');

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Initialize with an empty array for time labels
            datasets: [{
                label: 'Humidity',
                data: [], // Initialize with an empty array for humidity data
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second', // Display time in seconds
                        tooltipFormat: 'HH:mm:ss', // Tooltip format
                        displayFormats: {
                            second: 'HH:mm:ss' // Format for x-axis labels
                        }
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Humidity (%)'
                    }
                }
            },
            animation: false // Disable animations for smooth scrolling
        }
    });
}

function addDataToChart(time, humidity) {
    myChart.data.labels.push(time); // Add the new time to the labels array
    myChart.data.datasets[0].data.push(humidity); // Add the new humidity value

    // Keep only the last 30 seconds of data
    if (myChart.data.labels.length > 30) {
        myChart.data.labels.shift(); // Remove the oldest time
        myChart.data.datasets[0].data.shift(); // Remove the oldest humidity value
    }

    myChart.update(); // Update the chart
}

// Simulate adding new data every second
function simulateData() {
    setInterval(function() {
        var currentTime = new Date();
        var humidity = Math.random() * 100; // Simulated humidity data

        addDataToChart(currentTime, humidity);
    }, 1000);
}

// Initialize the chart and start simulating data
resizeChart();
simulateData();
