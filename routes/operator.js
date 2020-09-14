const express = require('express'),
    router = express.Router();




router.get('/', (req, res, next) => {
    const login = req.cookies.login;
    if (login) {
        res.render('operator', {
            title: 'Tryb operatora | ITA Tools Sp. z o.o',
            jsfiles: 'operator.js',
            cssfiles: 'operator',
            login: login
        })
    } else {
        res.redirect('/login')
    }
})


module.exports = router;