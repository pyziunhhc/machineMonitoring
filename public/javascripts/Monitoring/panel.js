import Dygraph from '../Chart/dygraph.js';
import ChartJS from '../Chart/chartJS.js';
import Table from '../Table/table.js';
import helpers from '../helpers/auxiliaryFunctions.js'
import Movebelt from '../Movebelt/movebelt.js'

class Panel {
    constructor(name, container) {
        this.machineName = name;
        this.data = null;
        this.currentStatus = null;
        this.intervalID = null;

        this.charts = {
            chartJS: {
                chart: null,
                container: null
            },
            dygraph: {
                chart: null,
                container: null
            }

        };
        this.table = {
            table: null,
        };
        this.containers = {
            mainContainer: container,
            morningChangeContainer: null,
            afternoonChangeContainer: null,
            nightChangeContainer: null,
            statusContainer: null
        };
        this.moveBelt =  null;
    }
    createMachinePanel() {
        //Rozdzielic przyciski na osobne klasy
        const machinePanelContainer = document.createElement('div'),

            panelContainer = document.createElement('div'),
            leftPanelContainer = document.createElement('div'),
            middlePanelContainer = document.createElement('div'),
            dygraphContainer = document.createElement('div'),
            chartJSContainer = document.createElement('div'),
            status = document.createElement('p'),
            table = document.createElement('table'),
            minimizedPanelContainer = document.querySelector('.minimized-panels');

        const moveBelt = new Movebelt(this.machineName, machinePanelContainer, minimizedPanelContainer, this.machineName, 'monitoring');
        this.moveBelt = moveBelt;
        moveBelt.create();
        /* NIE DZIAŁA USUWANIE INTERWAŁU Z FUNKCI SETINTERVAL -> NIE PRZESYŁA SIĘ ID Z MONITORING.JS DO PANEL.JS */
        this.charts.chartJS.container = chartJSContainer;
        this.charts.dygraph.container = dygraphContainer;
        //Tekst
        status.innerText = this.currentStatus;
        this.containers.statusContainer = status;
        //Klasy

        machinePanelContainer.classList.add('main-machine-panel__container');
        machinePanelContainer.classList.add(this.machineName)
        panelContainer.classList.add('panel__container')
        leftPanelContainer.classList.add('statuses-panel__container');
        leftPanelContainer.classList.add(this.machineName);
        middlePanelContainer.classList.add('charts-panel__container');
        dygraphContainer.classList.add('dygraph__container');
        dygraphContainer.classList.add(this.machineName);
        chartJSContainer.classList.add('chartJS__container');
        chartJSContainer.classList.add(this.machineName);

        //ID

        //Eventy

        //Dołączanie

        leftPanelContainer.appendChild(status)
        leftPanelContainer.appendChild(table);
        middlePanelContainer.appendChild(dygraphContainer);
        middlePanelContainer.appendChild(chartJSContainer);
        panelContainer.appendChild(leftPanelContainer);
        panelContainer.appendChild(middlePanelContainer);
        machinePanelContainer.appendChild(panelContainer);
        this.containers.mainContainer.appendChild(machinePanelContainer);
    }
    createChartJS(data, name, type) {
        const CHART = new ChartJS(data, name, type, this.charts.chartJS.container),
            chart = CHART.create();
        this.charts.chartJS.chart = chart;
    }
    createDygraph(data, name) {
        const GRAPH = new Dygraph(data, name, this.charts.chartJS.container),
            graph = GRAPH.create();
        this.charts.dygraph.chart = graph;
    }
    createTable(data, name) {
        const TABLE = new Table(data, name);
        const parent = document.querySelector(`.statuses-panel__container.${name}`),
            oldTable = document.querySelector(`.statuses-panel__container.${name} > table`);
        TABLE.create(parent, oldTable);
        this.table.table = TABLE;
    }
    updateTable(data, name) {
        this.table.table.update(data, name);
    }
    updateChartJS(data, chart) {
        //przeniesc do klasy chartjs
        let finalData = data.chartJS.time.map(val => new Date(val));
        chart.percentage.config.data.datasets[0].data = data.chartJS.percentage;
        chart.time.config.data.datasets[0].data = finalData;
        chart.percentage.update();
        chart.time.update();
    }
    updateDygraph(data, chart) {
        //przeniesc do klasy dygraph
        try {
            const finalData = data.dygraph.map((arrays, index) => {
                let finalData = [];
                arrays.map((val, index) => {
                    if (index == 0) {
                        finalData.push(new Date(val));
                    } else {
                        finalData.push(val)
                    }
                    return finalData;
                })
                return finalData;

            })
            chart.updateOptions({
                'file': finalData,
            });
        } catch (e) {
            console.log(e)
        }
    }
    updateStatus() {
        //ZŁY SPOSÓB, WYMYŚL INNY
        if(!this.moveBelt.intervalID){
            this.moveBelt.intervalID = this.intervalID;
        }
        this.containers.statusContainer.innerText = this.currentStatus.toUpperCase();
    }
}

export default Panel;