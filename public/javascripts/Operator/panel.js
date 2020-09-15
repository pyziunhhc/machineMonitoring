import ChartJS from '../Chart/chartJS.js';
import Table from '../Table/table.js';
import helpers from '../helpers/auxiliaryFunctions.js'
import machines from '../helpers/fetch/machines.js';
import message from '../helpers/messages.js';

class Panel {
    constructor(name) {
        this.machineName = name;
        this.data = null;
        this.currentStatus = null;
        this.intervalID = null;

        this.charts = {
            chartJS: {
                chart: null,
                container: null
            }

        };
        this.table = {
            table: null,
        };
        this.containers = {
            morningChangeContainer: null,
            afternoonChangeContainer: null,
            nightChangeContainer: null,
        };

    }
    createMachinePanel(data, containerToAppend) {
        //Rozdzielic przyciski na osobne klasy
        const machinePanelContainer = document.createElement('div'),
            moveContainerBeam = document.createElement('div'),
            controls = document.createElement('div'),
            panelContainer = document.createElement('div'),
            leftPanelContainer = document.createElement('div'),
            middlePanelContainer = document.createElement('div'),
            chartJSContainer = document.createElement('div'),
            changesContainer = document.createElement('div'),
            morningChangeContainer = document.createElement('div'),
            afternoonChangeContainer = document.createElement('div'),
            nightChangeContainer = document.createElement('div'),
            status = document.createElement('p'),
            table = document.createElement('table');

        const minimizePanelButton = document.createElement('button'),
            closePanelButton = document.createElement('button'),
            minimizedMachine = document.createElement('button');

        const minimizedPanelContainer = document.querySelector('.minimized-panels');

        //Tekst
        minimizedMachine.innerText = data.name;
        minimizedMachine.setAttribute('name', data.name)
        closePanelButton.innerText = 'X';
        status.innerText = this.currentStatus;

        //Klasy
        moveContainerBeam.classList.add('move-belt');
        closePanelButton.classList.add('close');
        minimizePanelButton.classList.add('minimize');
        controls.classList.add('controls');
        machinePanelContainer.classList.add('main-machine-panel__container');
        machinePanelContainer.classList.add(data.name)
        panelContainer.classList.add('panel__container')
        leftPanelContainer.classList.add('statuses-panel__container');
        leftPanelContainer.classList.add(data.name);
        middlePanelContainer.classList.add('charts-panel__container');
        changesContainer.classList.add('changes__container')
        morningChangeContainer.classList.add('morning__container');
        afternoonChangeContainer.classList.add('afternoon__container');
        nightChangeContainer.classList.add('night__container');


        chartJSContainer.classList.add('chartJS__container');
        chartJSContainer.classList.add(data.name);

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
            machines.unlockMachine({
                name: this.machineName
            }).then(res => {
                if (res.status == 200) {
                    message.showMessage('success', res.message)
                } else {
                    message.showMessage('error', res.message)
                }
            })
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

        middlePanelContainer.appendChild(chartJSContainer);
        changesContainer.appendChild(morningChangeContainer);
        changesContainer.appendChild(afternoonChangeContainer);
        changesContainer.appendChild(nightChangeContainer);
        panelContainer.appendChild(leftPanelContainer);
        panelContainer.appendChild(middlePanelContainer);
        panelContainer.appendChild(changesContainer);
        machinePanelContainer.appendChild(panelContainer);
        containerToAppend.appendChild(machinePanelContainer);

        this.charts.chartJS.container = chartJSContainer;
        this.containers.morningChangeContainer = morningChangeContainer;
        this.containers.afternoonChangeContainer = afternoonChangeContainer;
        this.containers.nightChangeContainer = nightChangeContainer;
    }
    createChartJS(data, name, type) {
        const CHART = new ChartJS(data, name, type, this.charts.chartJS.container),
            chart = CHART.create();
        this.charts.chartJS.chart = chart;
    }
    createChangesChartJS(data, name, type, change) {
        if (change == 'morning') {
            const CHART = new ChartJS(data, name, type, this.containers.morningChangeContainer),
                chart = CHART.create();
        } else if (change == 'afternoon') {
            const CHART = new ChartJS(data, name, type, this.containers.afternoonChangeContainer),
                chart = CHART.create();
        } else if (change == 'night') {
            const CHART = new ChartJS(data, name, type, this.containers.nightChangeContainer),
                chart = CHART.create();
        }
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

}

export default Panel;