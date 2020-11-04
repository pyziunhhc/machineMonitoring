const express = require('express');
const router = express.Router();
const auth = require('../routes/middleware/authenticate');
router.get('/', auth, (req, res, next) => {
    res.render('monitoring', {
        title: 'Monitoring | ITA Tools Sp. z o.o',
        jsfiles: 'Monitoring/monitoring.js',
        cssfiles: 'monitoring',
        login: req.cookies.login
    })
})

module.exports = router;