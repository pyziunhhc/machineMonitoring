import Table from '../../Table/table.js';


function getMachines() {
    return fetch('data/get/machines', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}

function getAllStatuses(data) {
    return fetch('data/get/all', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}

function updateStatuses(data) {
    return fetch('data/update/all', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => {
            throw new Error(err)
        })
}

function getSummaryStatuses(data) {
    return fetch('data/get/summary', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}

function updateSummaryStatuses(data) {
    return fetch('data/update/summary', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}

function checkMachineIsLocked(data) {
    return fetch('stats/check', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(error => error)
}

function checkUserStats(data) {
    return fetch('stats/checkStats', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}

function saveStatusesForUser(data) {
    return fetch('/stats/save', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function lockStatusesForUser(data) {
    return fetch('/stats/lock', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function updateStatusesForUser(data) {
    return fetch('/stats/update', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function listLockedMachines(data) {
    return fetch('/stats/locked', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function unlockMachine(data) {
    return fetch('/stats/unlock', {
            method: 'DELETE',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
}

function whatMachinesDoingNow() {
    const time = {
            from: new Date(),
            to: new Date(),
        },
        tableContainer = document.createElement('table');
    let machineStatuses = [{
        name: 'Maszyna',
        status: 'Status',
        class: 'none'
    }];
    const summaryTable = document.querySelector('.summary__container--table > table'),
        summaryContainer = document.querySelector('.summary__container--table');
    fetch('/dashboard/get/table/whatMachinesDoingNow', { //zrobic z tego osobne funkcje
            method: 'POST',
            body: JSON.stringify(time),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            let classes = [];
            data.forTable.map(machine => {
                machineStatuses.push({
                    name: machine.name,
                    status: machine.status,
                    class: machine.class
                })
            })
            let sortedMachineStatuses = machineStatuses.sort((a, b) => {
                if (a.name == 'Maszyna' || b.name == 'Maszyna') {

                } else {
                    if (a.name > b.name) {
                        return 1;
                    } else {
                        return -1;
                    }
                }

            });
            for (let i in sortedMachineStatuses) {
                let row = tableContainer.insertRow(i)
                for (let j = 0; j < 2; j++) {
                    if (j === 0) {
                        let cell = row.insertCell(j)
                        cell.innerText = sortedMachineStatuses[i].name;
                        cell.classList.add(sortedMachineStatuses[i].class);
                    } else if (j === 1) {
                        let cell = row.insertCell(j)
                        cell.innerText = sortedMachineStatuses[i].status;
                        cell.classList.add(sortedMachineStatuses[i].class);
                    }
                }
            }
            summaryContainer.replaceChild(tableContainer, summaryTable)
        })


}

function summaryMachinesWork() {
    const time = {
        from: new Date(new Date() - 86400000),
        to: new Date(),
    };
    fetch('/dashboard/get/table/summaryMachinesWork', {
            method: 'POST',
            body: JSON.stringify(time),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(res => {
            const data = res.currentWork,
                tableArray = [];
            data.map((element, index) => {
                const TABLE = new Table(element.data, element.name);
                const parent = document.querySelector('.summary-container__table--current'),
                    container = document.createElement('div'),
                    title = document.createElement('h3');
                title.innerText = element.name;

                container.classList.add('statuses-panel__container');
                container.classList.add(element.name)
                container.appendChild(title);
                parent.appendChild(container);
                TABLE.create(container);
                tableArray.push(TABLE);
                if (data.length - 1 == index) {
                    return tableArray;
                }
            })
            return tableArray;
        })
        .then((tableArray) => {
            setInterval(() => {
                const time = {
                    from: new Date(),
                    to: new Date(),
                };
                fetch('/dashboard/get/table/summaryMachinesWork', {
                        method: 'POST',
                        body: JSON.stringify(time),
                        credentials: 'include',
                        headers: {
                            'Accept': '*',
                            'Content-Type': 'application/json',
                        }
                    }).then(res => res.json())
                    .then(res => {
                        tableArray.forEach(table => {
                            // console.log(table)
                        })
                    })

            }, 1000)

        })
}

function whatMachinesDoingNowGraph() {
    const time = {
        from: new Date(),
        to: new Date()
    };

    const percentageCanvas = document.createElement('canvas'),
        summaryGraph = document.querySelector('.summary__container--graph');
    summaryGraph.appendChild(percentageCanvas);
    percentageCanvas.width = '250'
    percentageCanvas.height = '250'
    let percentageChart = null;

    fetch('/dashboard/get/graph/whatMachinesDoingNow', {
            method: 'POST',
            body: JSON.stringify(time),
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const percentageBarChartData = {
                labels: data.forGraph[0],
                datasets: [{
                    label: 'WARTOSC PROCENTOWA',
                    borderWidth: 1,
                    borderColor: 'black',
                    barStrokeWidth: 0,
                    weight: 100,
                    backgroundColor: data.forGraph[2],
                    data: data.forGraph[1]
                }, ],
            };

            percentageChart = new Chart(percentageCanvas, {
                type: 'pie',
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
                                size: 5,
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

        })

    return percentageChart;
}

function updateWhatMachinesDoingNowGraph(graph) {
    fetch('/dashboard/get/graph/whatMachinesDoingNow', {
            method: 'POST',
            body: JSON.stringify(time),
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            const percentageBarChartData = {
                labels: data.forGraph[0],
                datasets: [{
                    label: 'WARTOSC PROCENTOWA',
                    borderWidth: 1,
                    borderColor: 'black',
                    barStrokeWidth: 0,
                    weight: 100,
                    backgroundColor: data.forGraph[2],
                    data: data.forGraph[1]
                }, ],
            };
        })
}

function showUserStats(data) {
    return fetch('stats/show/user', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
}
export default {
    getMachines,
    getAllStatuses,
    updateSummaryStatuses,
    getSummaryStatuses,
    updateStatuses,
    whatMachinesDoingNow,
    summaryMachinesWork,
    whatMachinesDoingNowGraph,
    saveStatusesForUser,
    updateStatusesForUser,
    unlockMachine,
    listLockedMachines,
    checkMachineIsLocked,
    lockStatusesForUser,
    checkUserStats,
    showUserStats
}