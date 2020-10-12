const express = require('express');
const router = express.Router();
const fetchData = require('../helpers/fetchFromMainApp');
const {
    authUser
} = require('../helpers/authUser')
const process = require('../helpers/processStatuses/process')
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


router.get('/', (req, res, next) => {
    const cookie = authUser(req.cookies);
    console.log(req.cookies)
    cookie.then(auth => {

            if (auth) {
                res.render('monitoring', {
                    title: 'Monitoring | ITA Tools Sp. z o.o',
                    jsfiles: 'Monitoring/monitoring.js',
                    cssfiles: 'monitoring',
                    login: req.cookies.login
                })
            }
        })
        .catch(error => {
            res.redirect('/login')
        });
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
        const dataForDygraph = process.statusesForDygraph(data);
        const summaryMachineStatistics = process.summaryMachineStatistics(data, FROM, TO);
        const dataForChartJS = process.statusesForChartJS(summaryMachineStatistics);
        const workingCurrentStatus = `${data[data.length - 1].value}`;
        let currentStatus = null;
        if (workingCurrentStatus == 'null') {
            currentStatus = 'WYŁĄCZONA'
        } else {
            currentStatus = summaryMachineStatistics[workingCurrentStatus.toLowerCase()].displayName.toUpperCase()
        }
        res.send({
            dygraph: dataForDygraph,
            chartJS: dataForChartJS,
            summary: summaryMachineStatistics,
            status: currentStatus
        })
    })

})

router.post('/data/update', (req, res, next) => {
    try {
        const NAME = req.body.name,
            FROM = req.body.from,
            TO = req.body.to,
            LAST_STATUS = `${req.body.lastStatus}`;
        let oldData = req.body.oldData;
        //console.log(oldData.dygraph)
        fetchData.getStatuses(NAME, FROM, TO).then(newData => {
            const workingCurrentStatus = `${newData[0].value}`;
            const dataForDygraph = process.updateStatusesForDygraph(newData, oldData.dygraph, workingCurrentStatus, LAST_STATUS);
            const summaryMachineStatistics = process.updateSummaryMachineStatistics(newData, oldData.summary, workingCurrentStatus, LAST_STATUS);
            const dataForChartJS = process.updateStatusesForChartJS(summaryMachineStatistics);
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
        console.log(error)
    }

})

module.exports = router;