const express = require('express');
const router = express.Router();
const jsonToExcel = require('@papb/json-excel');
const {
    summaryMachineStatistics,
    statusesForDygraph,
    statusesForChartJS,
    updateSummaryMachineStatistics,
    updateStatusesForDygraph,
    updateStatusesForChartJS
} = require('../helpers/processStatuses/process');
const {
    parseMillisecondsIntoReadableTime
} = require('../helpers/helpers');
const fetchData = require('../helpers/fetchFromMainApp');
const machineTypes = [{
        name: 'WPD4_2065-6307',
        type: 'Ostrzenie-Erodowanie'
    }, {
        name: 'WPD3_2064-6839A',
        type: 'Ostrzenie-Erodowanie'
    },
    {
        name: 'WPD2_2064-6678',
        type: 'Ostrzenie-Erodowanie'
    },
    {
        name: 'WES1_2066-5215',
        type: 'Ostrzenie-VHM'
    },
    {
        name: 'WES2_2066-5264',
        type: 'Ostrzenie-Wiertła VHM'
    },
    {
        name: 'WES3_2066-5263FS',
        type: 'Ostrzenie-Wiertła VHM'
    },
    {
        name: 'WBA1_2067-0330',
        type: 'Ostrzenie-VHM'
    },
    {
        name: 'WBA2_2067-2244',
        type: 'Produkcja-VHM'
    },
    {
        name: 'WEV1_2066-4001',
        type: 'Produkcja-Erodowanie'
    },
    {
        name: 'WEV2_2066-4038',
        type: 'Produkcja-Erodowanie'
    },
    {
        name: 'WEV3_2066-4101',
        type: 'Produkcja-Erodowanie'
    },
    {
        name: 'WEV4_2066-4102',
        type: 'Produkcja-Erodowanie'
    },
    {
        name: 'WEV5_2066-4118',
        type: 'Produkcja-Erodowanie'
    },
    {
        name: 'WEV6_2066-4117',
        type: 'Produkcja-Erodowanie'
    },
    {
        name: 'DMG_NTX-1000',
        type: 'Produkcja-Korpusy'
    },
    {
        name: 'WP1_2065-6306',
        type: 'Produkcja-VHM'
    },

]

router.post('/get/reports/summary', (req, res, next) => {
    try {
        const machines = req.body.machines,
            FROM = req.body.from,
            TO = req.body.to,
            data = [];
        console.log(req.body)
        let destinationPath = `C:\\Users\\${process.env.USERNAME}\\Downloads\\Statystyki ${new Date(FROM).toLocaleDateString()} - ${new Date(TO).toLocaleDateString()}.xlsx`;
        machines.forEach((machine, index) => {
            const NAME = machine.name;
            fetchData.getStatuses(NAME, FROM, TO)
                .then(data => {
                    const SUMMARY = summaryMachineStatistics(data, FROM);
                    return {
                        data: SUMMARY,
                        name: NAME
                    };
                }).then(val => {
                    data.push({
                        data: val.data,
                        name: val.name
                    })
                    if (data.length == machines.length) {
                        const headers = ['Status', 'Czas', '%'];
                        let object = [];
                        const sortedData = data.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1
                            } else {
                                return -1;
                            }
                        })
                        sortedData.forEach((val, index) => {
                            let statuses = [headers],
                                name = val.name;
                            let sumOfTimes = val.data.sumOfTimes.data.time;
                            Object.values(val.data)
                                .filter(val => {
                                    return val.data.time > 0;
                                })
                                .filter(val => {
                                    return val.data.show;
                                })
                                .filter(val => {
                                    val.data.percentage = ((val.data.time * 100) / sumOfTimes).toFixed(2);
                                    return val;
                                })
                                .filter(val => {
                                    statuses.push([val.displayName, parseMillisecondsIntoReadableTime(val.data.time), `${val.data.percentage}`])
                                })
                            if (index != data.length) {
                                //statuses.push(headers)
                                object.push({
                                    sheetName: name,
                                    data: statuses,
                                    formatAsTable: true,
                                    //autoFitCellSizes: true,
                                })
                            }

                        })
                        async function createExcel(resolve, reject) {
                            return await jsonToExcel(object, destinationPath, {
                                overwrite: true,
                            })
                        }
                        createExcel()
                            .then(() => {
                                res.send({
                                    status: 200,
                                    message: ['Plik został wygenerowany'],
                                    data: data
                                })
                            });

                    }
                })
        })
    } catch (e) {
        console.log(e)
    }

})

router.post('/get/summary', (req, res, next) => {

    const NAME = req.body.name,
        FROM = req.body.from,
        TO = req.body.to;
    fetchData.getStatuses(NAME, FROM, TO)
        .then(data => {
            const summary = summaryMachineStatistics(data, FROM, TO);
            const workingCurrentStatus = `${data[data.length - 1].value}`;
            let currentStatus = null;
            if (workingCurrentStatus == 'null') {
                currentStatus = 'WYŁĄCZONA'
            } else {
                currentStatus = summary[workingCurrentStatus.toLowerCase()].displayName.toUpperCase()
            }
            return {
                data: summary,
                status: currentStatus,
                name: NAME
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
    const name = req.body.name,
        from = req.body.from,
        to = req.body.to,
        workingLastStatus = `${req.body.lastStatus}`,
        oldData = req.body.oldData;
    fetchData.getStatuses(name, from, to)
        .then(newData => {
            const workingCurrentStatus = `${newData[0].value}`;
            const summaryMachineStatistics = updateSummaryMachineStatistics(newData, oldData, workingCurrentStatus, workingLastStatus);
            let currentStatus = null;
            if (workingCurrentStatus == 'null') {
                currentStatus = 'WYŁĄCZONA'
            } else {
                currentStatus = summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase();
            }
            return {
                summaryMachineStatistics,
                currentStatus
            }
        })
        .then(data => {
            res.send({
                update: data.summaryMachineStatistics,
                status: data.currentStatus
            })
        })
        .catch(error => {
            console.log(error)
            throw new Error(error)
        })
    // } catch (error) {
    //     console.log(error)
    //     res.send({
    //         error: error
    //     })
    // }
})
router.post('/get/dygraph', (req, res, next) => {

    const machines = req.body.machines,
        FROM = req.body.from,
        TO = req.body.to,
        data = [];

    machines.map((val, index) => {
        const NAME = val.name;
        fetchData.getStatuses(NAME, FROM, TO).then(data => {
            const DYGRAPH = statusesForDygraph(data);

            return {
                data: DYGRAPH,
                name: NAME
            };
        }).then(val => {
            data.push({
                data: val.data,
                name: val.name
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
        FROM = req.body.from,
        TO = req.body.to,
        data = [];

    machines.map((val, index) => {
        const NAME = val.name;
        fetchData.getStatuses(NAME, FROM, TO).then(data => {
            const summaryMachineStatistics = statusesForChartJS(data);
            statusesForChartJSTS(data);
            return {
                data: summaryMachineStatistics,
                name: NAME
            };
        }).then(val => {
            data.push({
                data: val.data,
                name: val.name
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
    const NAME = req.body.name,
        FROM = req.body.from,
        TO = req.body.to;
    fetchData.getStatuses(NAME, FROM, TO).then(data => {
        const dataForDygraph = statusesForDygraph(data);
        const summary = summaryMachineStatistics(data, FROM, TO);
        const dataForChartJS = statusesForChartJS(summary);
        const workingCurrentStatus = `${data[data.length - 1].value}`;
        let currentStatus = null;
        if (workingCurrentStatus == 'null') {
            currentStatus = 'WYŁĄCZONA'
        } else {
            currentStatus = summary[workingCurrentStatus.toLowerCase()].displayName.toUpperCase()
        }
        res.send({
            dygraph: dataForDygraph,
            chartJS: dataForChartJS,
            summary: summary,
            status: currentStatus
        })
    })

})
router.post('/get/machines', (req, res, next) => {
    let machinesArray = [];
    return fetchData.getGroups().then(groups => {
        const firstHall = groups[0].name;
        fetchData.getMachines(firstHall).then(machines => {
            for (let i = 0; i < machines.length; i++) {
                machineTypes.map(machine => {
                    if (machine.name == machines[i].name) {
                        machinesArray.push({
                            name: machine.name,
                            type: machine.type
                        })
                    }
                })

            }
            return machinesArray;
        }).then(machines => {
            res.send({
                machines: machines
            })
        })

    })
})
router.post('/update/all', (req, res, next) => {
    try {
        const NAME = req.body.name,
            FROM = req.body.from,
            TO = req.body.to,
            LAST_STATUS = `${req.body.lastStatus}`;
        let oldData = req.body.oldData;
        fetchData.getStatuses(NAME, FROM, TO).then(newData => {
            const workingCurrentStatus = `${newData[0].value}`;
            const dataForDygraph = updateStatusesForDygraph(newData, oldData.dygraph, workingCurrentStatus, LAST_STATUS);
            const summaryMachineStatistics = updateSummaryMachineStatistics(newData, oldData.summary, workingCurrentStatus, LAST_STATUS);
            const dataForChartJS = updateStatusesForChartJS(summaryMachineStatistics);
            let currentStatus = null;
            if (workingCurrentStatus == 'null') {
                currentStatus = 'WYŁĄCZONA'
            } else {
                currentStatus = summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase();
            }
            res.send({
                dygraph: dataForDygraph,
                chartJS: dataForChartJS,
                summary: summaryMachineStatistics,
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