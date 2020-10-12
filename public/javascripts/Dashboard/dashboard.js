import machines from '../helpers/fetch/machines.js';
import Table from '../Table/table.js';
import Chart from '../Chart/chartJS.js'
window.onload = function () {
    const DASHBOARD = new Dashboard();
    DASHBOARD.createTables();
    DASHBOARD.createChart();
}

class Dashboard {
    constructor() {
        this.charts = {
            chartJS: {
                chart: null,
                container: null
            },
            tables: []

        };
    }
    createTables() {
        const now = {
                from: new Date(),
                to: new Date(),
            },
            summary = {
                from: new Date(new Date() - 86400000),
                to: new Date(),
            };
        let machineStatuses = [{
            name: 'Maszyna',
            status: 'Status',
            class: 'none'
        }];

        machines.whatMachinesDoingNow(now)
            .then(json => {
                const summaryTable = document.querySelector('.summary__container--table > table'),
                    summaryContainer = document.querySelector('.summary__container--table'),
                    tableContainer = document.createElement('table');
                json.forTable.map(machine => {
                    machineStatuses.push({
                        name: machine.name,
                        status: machine.status,
                        class: machine.class
                    })
                })
                let sortedMachineStatuses = machineStatuses.sort((a, b) => {
                    if (a.name == 'Maszyna' || b.name == 'Maszyna') {
                        return;
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
            }).then(() => {
                machines.summaryMachinesWork(summary)
                    .then(json => {
                        const data = json.currentWork,
                            tableArray = [];
                        const parent = document.querySelector('.summary-container__table--current');
                        data.map((element, index) => {
                            const TABLE = new Table(element.data, element.name);
                            const container = document.createElement('div'),
                                title = document.createElement('h3');
                            title.innerText = element.name;

                            container.classList.add('statuses-panel__container');
                            container.classList.add(element.name)
                            container.appendChild(title);
                            parent.appendChild(container);
                            tableArray.push({
                                TABLE,
                                container
                            });
                            if (data.length - 1 == index) {
                                return tableArray;
                            }
                        })
                        return tableArray;
                    })
                    .then((tableArray) => {
                        tableArray.forEach(element => {
                            element.TABLE.create(element.container)
                        })
                        return tableArray;
                    })
                    .then((tableArray) => {
                        // setInterval(() => {
                        //     tableArray.forEach(element => {
                        //         const dataToSend = {
                        //             name: element.TABLE._name,
                        //             from: new Date(),
                        //             to: new Date(),
                        //             oldData: element.TABLE._data,
                        //             lastStatus: element.TABLE._data.lastStatus.name
                        //         };
                        //         machines.updateSummaryStatuses(dataToSend)
                        //             .then(json => {
                        //                 element.TABLE._data = json.update;
                        //                 element.TABLE.update(element.TABLE._data);
                        //             }).catch(error => {
                        //                 console.log(error)
                        //             })
                        //     })
                        // }, 1000)


                    })
            })


    }
    createChart() {
        const time = {
                from: new Date(),
                to: new Date()
            },
            summaryGraph = document.querySelector('.summary__container--graph');
        machines.whatMachinesDoingNowGraph(time)
            .then(data => {
                const chart = new Chart(data, '', 'pie', summaryGraph);
                this.charts.chartJS.chart = chart.create('current-work')
                return;
            })

    }
    updateChart() {

    }
}