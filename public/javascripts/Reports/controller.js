import Report from './reports.js';
window.onload = function () {
    const select = document.querySelectorAll('select.month-report-machines'),
        machinesContainer = document.querySelectorAll('.machines');
    const report = new Report(select, machinesContainer);
    const buttonSelectedMachines = document.querySelector('button.month-selected-machines');
    const buttonAllMachines = document.querySelector('button.month-all-machines');
    const buttonDailySelectedMachines = document.querySelector('button.daily-selected-machines');
    const buttonDailyAllMachines = document.querySelector('button.daily-all-machines');
    buttonSelectedMachines.addEventListener('click', e => {
        report.getMonthSummaryStatuses('selected')
    });
    buttonAllMachines.addEventListener('click', e => {
        report.getMonthSummaryStatuses('all')
    });
    buttonDailySelectedMachines.addEventListener('click', e=>{
        report.getDailySummaryStatuses('selected')
    })
    buttonDailyAllMachines.addEventListener('click', e=>{
        report.getDailySummaryStatuses('all')
    })



}