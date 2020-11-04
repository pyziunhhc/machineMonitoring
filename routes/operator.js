const express = require('express'),
    router = express.Router();
const auth = require('../routes/middleware/authenticate')



router.get('/', auth, (req, res, next) => {
    res.render('operator', {
        title: 'Tryb operatora | ITA Tools Sp. z o.o',
        jsfiles: 'Operator/operator.js',
        cssfiles: 'operator',
        login: req.cookies.login
    })


})


module.exports = router;