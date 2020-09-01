const express = require('express');
const router = express.Router();


router.post('/', (req, res, next) => {
    const role = req.cookies.role;

    switch (role) {
        case 'Administrator': {
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
                    href: '/users/myAccount'
                }
            })
        }
        break;
        case 'Analityk': {

        }
        break;
        case 'Operator': {
            res.send({
                myAccount: {
                    name: 'Moje konto',
                    href: '/users/myAccount'
                }
            })
        }
    }

})


module.exports = router;