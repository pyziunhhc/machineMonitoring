const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
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
                work: {
                    name: 'Operator',
                    href: '/operator'
                },
                reports: {
                    name: 'Raporty',
                    href: '/reports'
                },
                settings: {
                    name: 'Ustawienia',
                    href: '/settings'
                },
                logout: {
                    name: 'Wyloguj',
                    href: '/logout'
                }


            })
        }
        break;
    case 'analityk': {

    }
    break;
    case 'operator': {
        res.send({
            settings: {
                name: 'Ustawienia',
                href: '/settings'
            },
            logout: {
                name: 'Wyloguj',
                href: '/logout'
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
                users: {
                    name: 'Użytkownicy',
                    href: '/users'
                },
                email: {
                    name: 'Raporty',
                    href: '/reports/setting'
                },
                myAccount: {
                    name: 'Moje konto',
                },
            })
        }
        break;
    case 'Analityk': {

    }
    break;
    case 'operator': {
        res.send({
            myAccount: {
                name: 'Moje konto',
            },
            myWork: {
                name: 'Praca',
                href: '/work'
            }
        })
    }
    }

})


module.exports = router;