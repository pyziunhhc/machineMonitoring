import config from './config.js'

function getDataForTable() {
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
    fetch('/dashboard/get/table', { //zrobic z tego osobne funkcje
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

function getDataForGraph() {
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

    fetch('/dashboard/get/graph', {
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
function getMachines(){
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
function getStatuses(data) {
    return fetch('/monitoring/data/get', {
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
    return fetch('/monitoring/data/update', {
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

function parseMillisecondsIntoReadableTime(milliseconds) {
    //Get hours from milliseconds

    let hours = milliseconds / 1000 / 60 / 60,
        absoluteHours = Math.floor(hours),
        h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours,

        //Get remainder from hours and convert to minutes
        minutes = (hours - absoluteHours) * 60,
        absoluteMinutes = Math.floor(minutes),
        m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes,

        //Get remainder from minutes and convert to seconds
        seconds = (minutes - absoluteMinutes) * 60,
        absoluteSeconds = Math.floor(seconds),
        s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return `${h}:${m}:${s}`
};

function showSettings() {
    return fetch('/settings', {
            method: 'POST',
            //body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function showUsers() {
    return fetch('/users/list', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function registerUser(data) {
    return fetch('/users/register', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}
function removeUser(data) {
    return fetch('/users/delete', {
        method: 'DELETE',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .catch(e => console.log(e))
}

function changePassword(data) {
    return fetch('/users/update/password', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function getUser(name) {
    return fetch('/users/user', {
            method: 'POST',
            body: JSON.stringify({
                name: name
            }),
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .catch(e => console.log(e))
}

function dragMouseDown(e, container) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = e.clientX,
        pos4 = e.clientY;


    function moveObject(e) {
        e.stopPropagation();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        container.style.top = `${(container.offsetTop - pos2)}px`
        container.style.left = `${(container.offsetLeft - pos1)}px`
    }

    function removeMove() {
        container.onmouseup = null;
        container.onmousemove = null;
    }
    container.onmousemove = moveObject;
    container.onmouseup = removeMove;
}

function showMessage(type, message) {
    const errorContainer = document.createElement('div'),
        container = document.querySelector('.main__container');

    message.forEach(val => {
        const messageParagraph = document.createElement('p');
        errorContainer.appendChild(messageParagraph);
        messageParagraph.innerText = val;
    })
    if (type == 'error') {
        errorContainer.classList.add('error__container');
    } else {
        errorContainer.classList.add('success__container');
    }


    container.appendChild(errorContainer);

    setTimeout(() => {
        errorContainer.classList.add('remove')
        errorContainer.remove()
    }, 5000)

}
export default {
    getMachines,
    getDataForTable,
    getDataForGraph,
    getStatuses,
    updateStatuses,
    parseMillisecondsIntoReadableTime,
    showSettings,
    showUsers,
    registerUser,
    changePassword,
    removeUser,
    dragMouseDown,
    getUser,
    showMessage
}