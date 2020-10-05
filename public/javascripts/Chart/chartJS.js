import helpers from '../helpers/auxiliaryFunctions.js';
class myChartJS {
    constructor(data, name, type, container) {
        this.data = data;
        this.name = name;
        this.type = type;
        this.container = container;
    }
    create(type) {
        let chartContainer = this.container,
            chartType = this.type,
            {
                width,
                height,
                fontSize,
                rotation
            } = this.calculateSize(chartType);

        if (type == 'summary') {
            let finalData = this.data.time.map(val => new Date(val)),
                percentageCanvas = document.createElement('canvas'),
                timeCanvas = document.createElement('canvas');
            const timeBarChartData = {
                    labels: this.data.labels,
                    datasets: [{
                        label: 'WARTOSC CZASOWA',
                        borderWidth: 1,
                        borderColor: 'black',
                        weight: 100,
                        backgroundColor: this.data.colors,
                        data: finalData
                    }, ],

                },
                percentageBarChartData = {
                    labels: this.data.labels,
                    datasets: [{
                        label: 'WARTOSC PROCENTOWA',
                        borderWidth: 1,
                        borderColor: 'black',
                        barStrokeWidth: 0,
                        weight: 100,
                        backgroundColor: this.data.colors,
                        data: this.data.percentage,
                    }, ],
                };
            percentageCanvas.style.width = `${width}px`;
            percentageCanvas.style.height = `${height}px`;
            timeCanvas.style.width = `${width}px`;
            timeCanvas.style.height = `${height}px`;

            percentageCanvas.classList.add('chartJS--percentage');
            percentageCanvas.classList.add(chartType);
            timeCanvas.classList.add('chartJS--time');
            timeCanvas.classList.add(chartType);

            chartContainer.appendChild(percentageCanvas);
            chartContainer.appendChild(timeCanvas);

            let percentageChart = new Chart(percentageCanvas, {
                    type: chartType,
                    data: percentageBarChartData,
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    display: false,
                                    min: 0.1,
                                    stacked: true,
                                },
                            }],
                            yAxes: [{
                                ticks: {
                                    display: false,
                                    min: 0.1,
                                    stacked: true,
                                },
                            }],
                        },
                        showAllTooltips: true,
                        tooltips: {
                            custom: function (tooltip) {
                                try {
                                    let value = tooltip.body[0].lines[0].split(': ')[1];
                                    tooltip.body[0].lines[0] = `${value}%`;
                                    tooltip.bodyFontSize = 20;
                                    if (!tooltip) return;
                                    tooltip.displayColors = false;
                                } catch (e) {
                                    console.log(e)
                                }
                            },
                        },
                        layout: {
                            padding: {
                                top: 20,
                                bottom: 20,
                            },
                        },
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
                                align: 'end',
                                clamp: true,
                                overlap: 'auto',
                                clip: true,
                                visibility: 'auto',
                                display: function (context) {
                                    return context.dataset.data[context.dataIndex] > 0;
                                },
                                backgroundColor: function (context) {
                                    return context.dataset.backgroundColor;
                                },
                                formatter: function (value, context) {
                                    return `${value}%`
                                },
                                borderRadius: 4,
                                font: {
                                    size: fontSize,
                                    weight: 'bold'
                                },
                                color: 'black',
                                textShadowColor: 'black',
                                rotation: rotation
                            },
                            tooltip: {}
                        },
                        legend: {
                            display: false
                        },
                    },

                }),
                timeChart = new Chart(timeCanvas, {
                    type: chartType,
                    data: timeBarChartData,
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    display: false,
                                    min: 0.1,
                                    stacked: true,
                                },
                            }],
                            yAxes: [{
                                ticks: {
                                    display: false,
                                    min: 0.1,
                                    stacked: true,
                                },
                            }]

                        },
                        showAllTooltips: true,
                        tooltips: {
                            enabled: true,
                            custom: function (tooltip) {
                                let value = null;
                                try {
                                    if (new Date(tooltip.body[0].lines[0].split(': ')[1]) == 'Invalid Date') {
                                        value = helpers.parseMillisecondsIntoReadableTime(tooltip.body[0].lines[0].split(': ')[1]);
                                    } else {
                                        value = helpers.parseMillisecondsIntoReadableTime(new Date(tooltip.body[0].lines[0].split(': ')[1]));
                                    }

                                    tooltip.bodyFontSize = 20;
                                    tooltip.body[0].lines[0] = value;
                                } catch (e) {
                                    console.log(e)
                                }

                                if (!tooltip) return;
                                // disable displaying the color box;
                                tooltip.displayColors = false;
                            },
                        },
                        layout: {
                            padding: {
                                top: 20,
                                bottom: 20,
                            },
                        },
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
                                align: 'end',
                                anchor: 'center',
                                clamp: true,
                                overlap: true,
                                clip: true,
                                backgroundColor: function (context) {
                                    return context.dataset.backgroundColor;
                                },
                                formatter: function (value, context) {
                                    return helpers.parseMillisecondsIntoReadableTime(value);
                                },
                                borderRadius: 4,
                                font: {
                                    size: fontSize,
                                    weight: 'bold'
                                },
                                textShadowColor: 'black',
                                textAlign: 'center',
                                color: 'black',
                                rotation: rotation

                            },
                            tooltip: {}
                        },
                        legend: {
                            display: false
                        },
                    },

                });
            return {
                time: timeChart,
                percentage: percentageChart
            }
        } else {
            const summaryCanvas = document.createElement('canvas'),
                chartData = {
                    labels: this.data.forGraph[0],
                    datasets: [{
                        label: 'BIEŻĄCA PRACA MASZYN',
                        borderWidth: 1,
                        borderColor: 'black',
                        barStrokeWidth: 0,
                        weight: 100,
                        backgroundColor: this.data.forGraph[2],
                        data: this.data.forGraph[1]
                    }, ],
                };
            summaryCanvas.style.width = `${width}px`;
            summaryCanvas.style.height = `${height}px`;
            chartContainer.appendChild(summaryCanvas);

            let summaryChart = new Chart(summaryCanvas, {
                type: chartType,
                data: chartData,
                options: {
                    scales: {
                        xAxes: [{
                            ticks: {
                                display: false,
                                min: 0.1,
                                stacked: true,
                            },
                        }],
                        yAxes: [{
                            ticks: {
                                display: false,
                                min: 0.1,
                                stacked: true,
                            },
                        }],
                    },
                    showAllTooltips: true,
                    tooltips: {
                        custom: function (tooltip) {
                            try {
                                let value = tooltip.body[0].lines[0].split(': ')[1];
                                tooltip.body[0].lines[0] = `${value}`;
                                tooltip.bodyFontSize = 20;
                                if (!tooltip) return;
                                tooltip.displayColors = false;
                            } catch (e) {
                                console.log(e)
                            }
                        },
                    },
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                        },
                    },
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            align: 'end',
                            clamp: true,
                            overlap: 'auto',
                            clip: true,
                            visibility: 'auto',
                            display: function (context) {
                                return context.dataset.data[context.dataIndex] > 0;
                            },
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor;
                            },
                            formatter: function (value, context) {
                                return `${value}`
                            },
                            borderRadius: 4,
                            font: {
                                size: 20,
                                weight: 'bold'
                            },
                            color: 'black',
                            textShadowColor: 'black',
                            //rotation: rotation
                        },
                        tooltip: {}
                    },
                    legend: {
                        display: false
                    },
                },

            })
            return summaryChart;
        }

    }
    update(data, chart) {
        let finalData = data.time.map(val => new Date(val));
        chart.percentage.config.data.datasets[0].data = data.percentage;
        chart.time.config.data.datasets[0].data = finalData;
        chart.percentage.config.data.labels = data.labels;
        chart.time.config.data.labels = data.labels;
        chart.percentage.config.data.datasets[0].backgroundColor = data.colors;
        chart.time.config.data.datasets[0].backgroundColor = data.colors;
        chart.percentage.update();
        chart.time.update();
    }
    calculateSize(chartType) {
        let width = 0,
            height = 0,
            fontSize = 0,
            rotation = 0;
        if (window.outerWidth > 1000) {
            if (chartType == 'pie') {
                width = window.outerWidth * 0.23;
                height = width;
                fontSize = 20;
            } else if (chartType == 'bar') {
                width = window.outerWidth * 0.2;
                height = window.outerWidth * 0.12;
                rotation = 270;
                fontSize = 17;
            } else {
                width = window.outerWidth * 0.31;
                height = window.outerWidth * 0.3;
                rotation = 270;
                fontSize = 18;
            }
        } else if (window.outerWidth > 1000) {
            width = window.outerWidth * 0.4;
            height = width;
            fontSize = 20;
        } else if (window.outerWidth < 1000) {
            if (chartType == 'pie') {
                width = window.outerWidth * 0.5;
                height = width;
                fontSize = 10;
            } else {
                width = window.outerWidth * 0.3;
                height = window.outerWidth * 0.3;
                fontSize = 20;
                rotation = 270;
            }
        }
        return {
            width,
            height,
            fontSize,
            rotation
        }
    }
}

export default myChartJS;