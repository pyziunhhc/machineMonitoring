const express = require('express');
const router = express.Router();
const fetchData = require('../helpers/fetchFromMainApp');
//const machines = require('../helpers/machines/functionsForMachines')
const {
    checkCookie
} = require('../helpers/checkCookie')
const processData = require('../helpers/processStatuses/monitoring');
const {
    default: fetch
} = require('node-fetch');
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
        name: 'DMG_NTX-1000',
        type: 'Produkcja-Korpusy'
    },
    {
        name: 'WP1_2065-6306',
        type: 'Produkcja-VHM'
    },

]


router.get('/', (req, res, next) => {
    const cookie = checkCookie(req.cookies);

    if (cookie) {
        const login = req.cookies.login;
        res.render('monitoring', {
            title: 'Monitoring | ITA Tools Sp. z o.o',
            jsfiles: 'monitoring.js',
            cssfiles: 'monitoring',
            login: login
        })
    } else {
        res.redirect('/login')
        // res.render('login', {
        //     title: 'Witaj | ITA Tools Sp. z o.o',
        //     jsfiles: 'controller.js',
        // })
    }

})

router.post('/', (req, res, next) => {
    machines.getMachines.then(machines => {
        res.send({
            machines: machines
        })
    })

})

router.post('/data/get', (req, res, next) => {
    const NAME = req.body.name,
        FROM = req.body.from,
        TO = req.body.to;
    fetchData.getStatuses(NAME, FROM, TO).then(data => {
        const dataForDygraph = processData.statusesForDygraph(data);
        const summaryMachineStatistics = processData.summaryMachineStatistics(data);
        const dataForChartJS = processData.statusesForChartJS(summaryMachineStatistics);
        const currentStatus = data[data.length - 1].value;
        res.send({
            dygraph: dataForDygraph,
            chartJS: dataForChartJS,
            summary: summaryMachineStatistics,
            status: currentStatus
        })
    })

})

router.post('/data/update', (req, res, next) => {
    const NAME = req.body.name,
        FROM = req.body.from,
        TO = req.body.to,
        LAST_STATUS = req.body.lastStatus;
    let oldData = req.body.oldData;
    fetchData.getStatuses(NAME, FROM, TO).then(newData => {
        const currentStatus = newData[0].value;
        const dataForDygraph = processData.updateStatusesForDygraph(newData, oldData.dygraph, currentStatus, LAST_STATUS);
        const summaryMachineStatistics = processData.updateSummaryMachineStatistics(newData, oldData.summary, currentStatus, LAST_STATUS);
        const dataForChartJS = processData.updateStatusesForChartJS(summaryMachineStatistics);
        res.send({
            dygraph: dataForDygraph,
            chartJS: dataForChartJS,
            summary: summaryMachineStatistics,
            status: currentStatus
        })
    })

})

module.exports = router;