const express = require('express');
const router = express.Router();
const {
    checkCookie
} = require('../helpers/checkCookie');
// const processData = require('../helpers/processStatuses/report');
// const fetchData = require('../helpers/fetchData');
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
    const cookie = checkCookie(req.cookies)
    if (cookie) {
        const login = req.cookies.login;
        res.render('reports', {
            title: 'Raporty | ITA Tools Sp. z o.o',
            jsfiles: 'controller.js',
            login: login
        })
    } else {
        res.redirect('/login')
        // res.render('login', {
        //     title: 'Logowanie | ITA Tools Sp. z o.o',
        //     jsfiles: 'controller.js'
        // })
    }
})
router.get('/setting', (req, res, next) => {



})


module.exports = router;