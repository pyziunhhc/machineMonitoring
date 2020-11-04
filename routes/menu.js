const express = require('express');
const router = express.Router();
const Server = require('../models/Server');
router.post('/menu', (req, res, next) => {
    const role = req.cookies.role;

    switch (role) {
        case 'administrator': {
            res.send({
                dashboard: {
                    name: 'Dashboard',
                    href: '/dashboard'
                },
                monitoring: {
                    name: 'Monitoring',
                    href: '/monitoring'
                },
                operator: {
                    name: 'Operator',
                    href: '/operator'
                },
                works:{
                    name: 'Zadania',
                    href: '/tasks'
                },
                reports: {
                    name: 'Raporty',
                    href: '/reports'
                },
                statistics: {
                    name: 'Statystyki',
                    href: '/stats/all'
                },

                settings: {
                    name: 'Ustawienia',
                    href: '/settings'
                },
            })
        }
        break;
    case 'analityk': {
        res.send({
            dashboard: {
                name: 'Dashboard',
                href: '/dashboard'
            },
            monitoring: {
                name: 'Monitoring',
                href: '/monitoring'
            },
            works:{
                name: 'Zadania',
                href: '/tasks'
            },
            reports: {
                name: 'Raporty',
                href: '/reports'
            },
            statistics: {
                name: 'Statystyki',
                href: '/stats/all'
            },
            settings: {
                name: 'Ustawienia',
                href: '/settings'
            },
        })
    }
    break;
    case 'operator': {
        res.send({
            work: {
                name: 'Operator',
                href: '/operator'
            },
            settings: {
                name: 'Ustawienia',
                href: '/settings'
            },
            myWork: {
                name: 'Moje statystyki',
                href: '/stats/user'
            }
        })
    }
    }
})
router.post('/settings', (req, res, next) => {
    const role = req.cookies.role;

    switch (role) {
        case 'administrator': {
            res.send({
                server: {
                    name: 'Serwer'
                },
                users: {
                    name: 'Użytkownicy',
                    href: '/users'
                },
                email: {
                    name: 'Raporty mailowe',
                    href: '/reports/mail'
                },
                myAccount: {
                    name: 'Moje konto',
                },
                lockedMachines: {
                    name: 'Zablokowane maszyny',
                }
            })
        }
        break;
    case 'analityk': {
        res.send({
            myAccount: {
                name: 'Moje konto',
            },
            users: {
                name: 'Użytkownicy',
                href: '/users'
            },
        })
    }
    break;
    case 'operator': {
        res.send({
            myAccount: {
                name: 'Moje konto',
            }
        })
    }
    }

})
router.get('/server', (req, res, next) => {
    Server.find((err, document) => {
        if (document.length) {
            res.send({
                status: 200,
                config: document
            })
        } else {
            res.send({
                status: 500,
                message: ['Brak danych nt. serwera']
            })
        }
    })
})
router.post('/server/save', (req, res, next) => {
    const {
        ip,
        port,
        apiVersion,
        login,
        password,
        testMode
    } = req.body;
    Server.find((err, document) => {
        if (!document.length) {
            const server = new Server({
                ip,
                port,
                apiVersion,
                login,
                password,
                testMode
            })
            server.save(error => {
                if (!error) {
                    res.send({
                        status: 200,
                        message: ['Pomyślnie zapisano ustawienia serwera']
                    })
                }
            })
        } else {
            Server.findOneAndUpdate({}, {
                ip,
                port,
                apiVersion,
                login,
                password,
                testMode
            }, (err, document) => {

            })
        }
    })

})

module.exports = router;