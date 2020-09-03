import Dygraph from '../Chart/dygraph.js';
import ChartJS from '../Chart/chartJS.js';
import Table from '../Table/table.js';
import helpers from '../helpers/fetch.js'

class Panel {
    constructor() {
        this.chartJS = null;
        this.tableObject = null;
        this.dygraph = null;
        this.data = null;
        this.currentStatus = null;
        this.intervalID = null;
    }
    createMachinePanel(data, name) {
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
            table = document.createElement('table');

        const minimizePanelButton = document.createElement('button'),
            closePanelButton = document.createElement('button'),
            minimizedMachine = document.createElement('button');

        const containerToAppend = document.querySelector('.monitoring__container'),
            minimizedPanelContainer = document.querySelector('.minimized-panels');

        //Tekst
        minimizedMachine.innerText = data.name;
        closePanelButton.innerText = 'X';
        status.innerText = this.currentStatus;
        //Klasy
        moveContainerBeam.classList.add('move-belt');
        closePanelButton.classList.add('close');
        minimizePanelButton.classList.add('minimize');
        controls.classList.add('controls');
        machinePanelContainer.classList.add('main-machine-panel__container');
        panelContainer.classList.add('panel__container')
        leftPanelContainer.classList.add('statuses-panel__container');
        leftPanelContainer.classList.add(name);
        middlePanelContainer.classList.add('charts-panel__container');
        dygraphContainer.classList.add('dygraph__container');
        dygraphContainer.classList.add(name);
        chartJSContainer.classList.add('chartJS__container');
        chartJSContainer.classList.add(name);

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
        containerToAppend.appendChild(machinePanelContainer);
    }
    createChartJS(data, name, type) {
        const CHART = new ChartJS(data, name, type),
            chart = CHART.create();
        this.chartJS = chart;
    }
    createDygraph(data, name) {
        const GRAPH = new Dygraph(data, name),
            graph = GRAPH.create();
        this.dygraph = graph;
    }
    createTable(data, name) {
        const TABLE = new Table(data, name);
        TABLE.create();
        this.tableObject = TABLE;
    }
    updateTable(data, name) {
        this.tableObject.update(data, name);
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
}

export default Panel;