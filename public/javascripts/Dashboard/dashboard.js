import fetch from '../helpers/fetch.js';
import Menu from '../Menu/menu.js';
window.onload = function () {
    const DASHBOARD = new Dashboard();
    const MENU = new Menu();

    //setInterval(, 1000);
    DASHBOARD.createTable();
    DASHBOARD.createChart();
    MENU.hideMenu();
    MENU.showSettings();
}

class Dashboard {
    constructor() {

    }
    createTable() {
        fetch.getDataForTable();
    }
    createChart() {
        fetch.getDataForGraph();
    }
}