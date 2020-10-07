import Dygraph from '../Chart/dygraph.js';
import ChartJS from '../Chart/chartJS.js';
import Table from '../Table/table.js';
import Movebelt from '../Movebelt/movebelt.js';
import machines from '../helpers/fetch/machines.js'

class Panel {
    constructor(mainContainer, morningChangeContainer = null, afternoonChangeContainer = null, nightChangeContainer = null, machineName = null, place = null) {
        this._machineName = machineName;
        this.data = null;
        this._currentStatus = null;
        this.intervals = {
            _statsID: null,
            _currentID: null,
        };

        this.charts = {
            chartJS: {
                chart: null,
                object: null,
                container: null
            },
            dygraph: {
                chart: null,
                object: null,
                container: null
            }

        };
        this.tables = {
            table: null,
        };
        this.containers = {
            _mainContainer: mainContainer,
            _morningChangeContainer: morningChangeContainer,
            _afternoonChangeContainer: afternoonChangeContainer,
            _nightChangeContainer: nightChangeContainer,
            statusContainer: null
        };
        this._place = place;
        this.moveBelt = null;
    }
    createCurrentChangePanel() {
        //Rozdzielic przyciski na osobne klasy
        const panelContainerWrapper = document.createElement('div'),
            panelContainer = document.createElement('div'),
            leftPanelContainer = document.createElement('div'),
            middlePanelContainer = document.createElement('div'),
            dygraphContainer = document.createElement('div'),
            chartJSContainer = document.createElement('div'),
            changesContainer = document.createElement('div'),
            morningChangeContainer = document.createElement('div'),
            afternoonChangeContainer = document.createElement('div'),
            nightChangeContainer = document.createElement('div'),
            morningChangeTitle = document.createElement('h3'),
            afternoonChangeTitle = document.createElement('h3'),
            nightChangeTitle = document.createElement('h3'),
            status = document.createElement('p'),
            table = document.createElement('table'),
            minimizedPanelContainer = document.querySelector('.minimized-panels');

        const moveBelt = new Movebelt(this._machineName, panelContainerWrapper, minimizedPanelContainer, this._machineName, this._place);
        this.moveBelt = moveBelt;
        moveBelt.create();

        this.charts.chartJS.container = chartJSContainer;
        this.charts.dygraph.container = dygraphContainer;

        status.innerText = this._currentStatus;
        this.containers.statusContainer = status;
        morningChangeTitle.innerText = 'I zmiana';
        afternoonChangeTitle.innerText = 'II zmiana';
        nightChangeTitle.innerText = 'III zmiana';

        panelContainerWrapper.classList.add('main-machine-panel__container');
        panelContainerWrapper.classList.add(this._machineName)
        panelContainer.classList.add('panel__container')
        leftPanelContainer.classList.add('statuses-panel__container');
        leftPanelContainer.classList.add(this._machineName);
        middlePanelContainer.classList.add('charts-panel__container');
        dygraphContainer.classList.add('dygraph__container');
        dygraphContainer.classList.add(this._machineName);
        chartJSContainer.classList.add('chartJS__container');
        chartJSContainer.classList.add(this._machineName);
        changesContainer.classList.add('changes__container')
        morningChangeContainer.classList.add('morning__container');
        afternoonChangeContainer.classList.add('afternoon__container');
        nightChangeContainer.classList.add('night__container');

        leftPanelContainer.appendChild(status)
        leftPanelContainer.appendChild(table);
        middlePanelContainer.appendChild(dygraphContainer);
        middlePanelContainer.appendChild(chartJSContainer);
        panelContainer.appendChild(leftPanelContainer);
        panelContainer.appendChild(middlePanelContainer);
        panelContainerWrapper.appendChild(panelContainer);
        morningChangeContainer.appendChild(morningChangeTitle);
        afternoonChangeContainer.appendChild(afternoonChangeTitle);
        nightChangeContainer.appendChild(nightChangeTitle);
        changesContainer.appendChild(morningChangeContainer);
        changesContainer.appendChild(afternoonChangeContainer);
        changesContainer.appendChild(nightChangeContainer);
        middlePanelContainer.appendChild(changesContainer);
        this.containers._mainContainer.appendChild(panelContainerWrapper);
        this.containers._morningChangeContainer = morningChangeContainer;
        this.containers._afternoonChangeContainer = afternoonChangeContainer;
        this.containers._nightChangeContainer = nightChangeContainer;
    }
    createChartJS(data, name, type) {
        const CHART = new ChartJS(data, name, type, this.charts.chartJS.container),
            chart = CHART.create('summary');
        this.charts.chartJS.object = CHART;
        this.charts.chartJS.chart = chart;
    }
    createDygraph(data, name) {
        const GRAPH = new Dygraph(data, name, this.charts.dygraph.container),
            graph = GRAPH.create();
        this.charts.dygraph.object = GRAPH;
        this.charts.dygraph.chart = graph;
    }
    createChangesChartJS(data, name, type, change) {
        if (change == 'morning') {
            const CHART = new ChartJS(data, name, type, this.containers._morningChangeContainer),
                chart = CHART.create('summary');
        } else if (change == 'afternoon') {
            const CHART = new ChartJS(data, name, type, this.containers._afternoonChangeContainer),
                chart = CHART.create('summary');
        } else if (change == 'night') {
            const CHART = new ChartJS(data, name, type, this.containers._nightChangeContainer),
                chart = CHART.create('summary');
        }
    }
    createChangesPanel(name) {
        const now = new Date();
        const morningChangeData = {
                name: name,
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 7),
                to: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 59, 59, 59)
            },
            afternoonChangeData = {
                name: name,
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 15),
                to: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22, 59, 59, 59)
            },
            nightChangeData = {
                name: name,
                from: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23),
                to: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 59, 59, 59)
            };
        machines.getAllStatuses(morningChangeData).then(json => {
            this.createChangesChartJS(json.chartJS, name, 'bar', 'morning');
        })
        machines.getAllStatuses(afternoonChangeData).then(json => {
            this.createChangesChartJS(json.chartJS, name, 'bar', 'afternoon');
        })
        machines.getAllStatuses(nightChangeData).then(json => {
            this.createChangesChartJS(json.chartJS, name, 'bar', 'night');
        })

    }
    createTable(data, name) {
        const TABLE = new Table(data, name);
        const parent = document.querySelector(`.statuses-panel__container.${name}`),
            oldTable = document.querySelector(`.statuses-panel__container.${name} > table`);
        TABLE.create(parent, oldTable);
        this.tables.table = TABLE;
    }
    updateTable(data, name) {
        this.tables.table.update(data, name);
    }
    updateChartJS(data) {
        this.charts.chartJS.object.update(data, this.charts.chartJS.chart)
    }
    updateDygraph(data) {
        //przeniesc do klasy dygraph
        try {
            this.charts.dygraph.object.update(data, this.charts.dygraph.chart)
        } catch (e) {
            console.log(e)
        }
    }
    updateStatus() {
        if (!this.moveBelt._intervalID) {
            this.moveBelt._intervalID = this.intervals._currentID;
        }
        if (!this.moveBelt._statsIntervalID) {
            this.moveBelt._statsIntervalID = this.intervals._statsID;
        }
        this.containers.statusContainer.innerText = this._currentStatus.toUpperCase();
    }
}

export default Panel;