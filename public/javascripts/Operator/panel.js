import ChartJS from '../Chart/chartJS.js';
import Table from '../Table/table.js';
import Movebelt from '../Movebelt/movebelt.js';

class Panel {
    constructor(name) {
        this.machineName = name;
        this.data = null;
        this.currentStatus = null;
        this.intervalID = null;
        this.statsIntervalID = null;
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
            statusContainer: null
        };
        this.moveBelt = null;
    }
    createMachinePanel(data, containerToAppend) {
        //Rozdzielic przyciski na osobne klasy
        const machinePanelContainer = document.createElement('div'),
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
        const minimizedPanelContainer = document.querySelector('.minimized-panels');

        const moveBelt = new Movebelt(this.machineName, machinePanelContainer, minimizedPanelContainer, this.machineName, 'operator')
        this.moveBelt = moveBelt;
        moveBelt.create()
        this.containers.statusContainer = status;
        //Tekst
        status.innerText = this.currentStatus;

        //Klasy


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


        //Dołączanie


        leftPanelContainer.appendChild(status);
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
    updateStatus() {
        if (!this.moveBelt.intervalID) {
            this.moveBelt.intervalID = this.intervalID;
        }
        if(!this.moveBelt.statsIntervalID){
            this.moveBelt.statsIntervalID = this.statsIntervalID;
        }
        this.containers.statusContainer.innerText = this.currentStatus.toUpperCase();
    }

}

export default Panel;