const express = require('express'),
    router = express.Router();
const {
    summaryMachineStatistics,
    statusesForDygraph,
    statusesForChartJS,
    updateSummaryMachineStatistics,
    updateStatusesForDygraph,
    updateStatusesForChartJS
} = require('../helpers/processStatuses/process');
const {
    getStatuses,
    getMachines,
    getGroups
} = require('../helpers/fetchFromMainApp');
const {
    machineTypes
} = require('../config/machineTypes');
const auth = require('../routes/middleware/authenticate');



router.post('/get/summary', (req, res, next) => {
    const machineName = req.body.name,
        getDataFromDate = req.body.from,
        getDataToDate = req.body.to;
    getStatuses(machineName, getDataFromDate, getDataToDate)
        .then(data => {
            const _summaryMachineStatistics = summaryMachineStatistics(data, getDataFromDate, getDataToDate);
            const workingCurrentStatus = `${data[data.length - 1].value}`;
            let currentStatus = null;
            if (workingCurrentStatus == 'null') {
                currentStatus = 'WYŁĄCZONA'
            } else {
                currentStatus = _summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase()
            }
            return {
                data: _summaryMachineStatistics,
                status: currentStatus,
                name: machineName
            };
        }).then(val => {
            res.send({
                data: val.data,
                status: val.status,
                name: val.name
            })
        })
        .catch(error => {
            throw new Error(error)
        })
})
router.post('/update/summary', (req, res, next) => {
    // try {
    const machineName = req.body.name,
        getDataFromDate = req.body.from,
        getDataToDate = req.body.to,
        workingLastStatus = `${req.body.lastStatus}`,
        oldData = req.body.oldData;
    getStatuses(machineName, getDataFromDate, getDataToDate)
        .then(newData => {
            const workingCurrentStatus = `${newData[0].value}`;
            const _summaryMachineStatistics = updateSummaryMachineStatistics(newData, oldData, workingCurrentStatus, workingLastStatus);
            let currentStatus = null;
            if (workingCurrentStatus == 'null') {
                currentStatus = 'WYŁĄCZONA'
            } else {
                currentStatus = _summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase();
            }
            return {
                _summaryMachineStatistics,
                currentStatus
            }
        })
        .then(data => {
            res.send({
                update: data._summaryMachineStatistics,
                status: data.currentStatus
            })
        })
        .catch(error => {
            throw new Error(error)
        })
})
router.post('/get/dygraph', (req, res, next) => {

    const machines = req.body.machines,
        getDataFromDate = req.body.from,
        getDataToDate = req.body.to,
        finalData = [];

    machines.map((val, index) => {
        const machineName = val.name;
        getStatuses(machineName, getDataFromDate, getDataToDate)
            .then(data => {
                const _statusesForDygraph = statusesForDygraph(data);
                return {
                    statusesForDygraph: _statusesForDygraph,
                    name: machineName
                };
            }).then(data => {
                finalData.push({
                    data: data.statusesForDygraph,
                    name: data.name
                })
                if (data.length == machines.length) {
                    res.send({
                        data: data
                    })
                }
            })
    })
})
router.post('/get/chartJS', (req, res, next) => {
    const machines = req.body.machines,
        getDataFromDate = req.body.from,
        getDataToDate = req.body.to,
        finalData = [];

    machines.map((val, index) => {
        const machineName = val.name;
        getStatuses(machineName, getDataFromDate, getDataToDate)
            .then(data => {
                const _statusesForChartJS = statusesForChartJS(data);
                return {
                    statusesForChartJS: _statusesForChartJS,
                    name: machineName
                };
            }).then(data => {
                finalData.push({
                    data: data.statusesForChartJS,
                    name: data.name
                })
                if (data.length == machines.length) {
                    res.send({
                        data: data
                    })
                }
            })
    })
})
router.post('/get/all', (req, res, next) => {
    const machineName = req.body.name,
        getDataFromDate = req.body.from,
        getDataToDate = req.body.to;
    getStatuses(machineName, getDataFromDate, getDataToDate)
        .then(data => {
            const _statusesForDygraph = statusesForDygraph(data);
            const _summaryMachineStatistics = summaryMachineStatistics(data, getDataFromDate, getDataToDate);
            const _statusesForChartJS = statusesForChartJS(_summaryMachineStatistics);
            const workingCurrentStatus = `${data[data.length - 1].value}`;
            let currentStatus = null;
            if (workingCurrentStatus == 'null') {
                currentStatus = 'WYŁĄCZONA'
            } else {
                currentStatus = _summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase()
            }
            res.send({
                dygraph: _statusesForDygraph,
                chartJS: _statusesForChartJS,
                summary: _summaryMachineStatistics,
                status: currentStatus
            })
        })
})
router.post('/update/all', (req, res, next) => {
    try {
        const machineName = req.body.name,
            getDataFromDate = req.body.from,
            getDataToDate = req.body.to,
            lastStatus = `${req.body.lastStatus}`;
        let oldData = req.body.oldData;
        getStatuses(machineName, getDataFromDate, getDataToDate)
            .then(newData => {
                const workingCurrentStatus = `${newData[0].value}`;
                const _statusesForDygraph = updateStatusesForDygraph(newData, oldData.dygraph, workingCurrentStatus, lastStatus);
                const _summaryMachineStatistics = updateSummaryMachineStatistics(newData, oldData.summary, workingCurrentStatus, lastStatus);
                const _statusesForChartJS = updateStatusesForChartJS(_summaryMachineStatistics);
                let currentStatus = null;
                if (workingCurrentStatus == 'null') {
                    currentStatus = 'WYŁĄCZONA'
                } else {
                    currentStatus = _summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase();
                }
                res.send({
                    dygraph: _statusesForDygraph,
                    chartJS: _statusesForChartJS,
                    summary: _summaryMachineStatistics,
                    status: currentStatus
                })
                //DODAĆ FUNKCJONALNOŚĆ GDZIE BĘDZIE ODEJMOWANY CZAS (SUMA CZASÓW SIĘ NIE ZGADZA)
            }).catch(error => {
                console.log(error)
            })
    } catch (error) {
        throw new Error(error)
    }

})


module.exports = router;