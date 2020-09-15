import Dygraph from '../Chart/dygraph.js';
import ChartJS from '../Chart/chartJS.js';
import Table from '../Table/table.js';
import helpers from '../helpers/auxiliaryFunctions.js'

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
        };
    }
    createMachinePanel() {
        //Rozdzielic przyciski na osobne klasy
        const machinePanelContainer = document.createElement('div'),
            moveContainerBeam = document.createElement('div'),
            controls = document.createElement('div'),
            panelContainer = document.createElement('div'),
            leftPanelContainer = document.createElement('div'),
            middlePanelContainer = document.createElement('div'),
            dygraphContainer = document.createElement('div'),
            chartJSContainer = document.createElement('div'),
            status = document.createElement('p'),
            table = document.createElement('table'),
            minimizePanelButton = document.createElement('button'),
            closePanelButton = document.createElement('button'),
            minimizedMachine = document.createElement('button'),
            minimizedPanelContainer = document.querySelector('.minimized-panels');

        this.charts.chartJS.container = chartJSContainer;
        this.charts.dygraph.container = dygraphContainer;
        //Tekst
        minimizedMachine.innerText = this.machineName;
        minimizedMachine.setAttribute('name', this.machineName)
        closePanelButton.innerText = 'X';
        status.innerText = this.currentStatus;
        this.statusContainer = status;
        //Klasy
        moveContainerBeam.classList.add('move-belt');
        closePanelButton.classList.add('close');
        minimizePanelButton.classList.add('minimize');
        controls.classList.add('controls');
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
        //Przerzucić na osobną funkcję dla każego elementu strony




        moveContainerBeam.onmousedown = helpers.dragMouseDown.bind(null, this, machinePanelContainer);
        minimizePanelButton.addEventListener('click', (e) => {
            // if(this.intervalID){
            //     clearInterval(this.intervalID)
            // }
            machinePanelContainer.classList.add('minimized');
            minimizedPanelContainer.appendChild(minimizedMachine);
        });
        closePanelButton.addEventListener('click', (e) => {
            machinePanelContainer.remove();
            clearInterval(this.intervalID)
        })
        minimizedMachine.addEventListener('click', (e) => {
            machinePanelContainer.classList.remove('minimized');
            minimizedMachine.remove();
        })
        //Dołączanie
        machinePanelContainer.appendChild(moveContainerBeam);
        moveContainerBeam.appendChild(controls);
        controls.appendChild(minimizePanelButton);
        controls.appendChild(closePanelButton);
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
        this.statusContainer.innerText = this.currentStatus.toUpperCase();
    }
}

export default Panel;