import machines from '../helpers/fetch/machines.js';


window.onload = function () {
    const DASHBOARD = new Dashboard();
    //const MENU = new Menu();

    DASHBOARD.createTables();
    DASHBOARD.createChart();
    //setInterval(DASHBOARD.updateChart, 1000);
    // MENU.createMenu();
    // MENU.hideMenu();
    // MENU.showSettings();
}

class Dashboard {
    constructor() {
        this.whatMachinesDoingNowGraph = null;
    }
    createTables() {
        //setInterval(machines.whatMachinesDoingNow, 1000) DZIAŁA, ODKOMENTOWAĆ
        machines.whatMachinesDoingNow();
        machines.summaryMachinesWork();
    }
    createChart() {
        this.whatMachinesDoingNowGraph = machines.whatMachinesDoingNowGraph();

    }
    updateChart() {
        //console.log(this.whatMachinesDoingNowGraph)
    }
}