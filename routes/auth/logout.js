const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const {clearCookies} = require('../../helpers/checkCookie')

router.get('/', (req, res, next) => {
    clearCookies(res, req.cookies)
    res.render('login', {
        title: "Logowanie | ITA Tools Sp z o.o",
        jsfiles: 'login.js'
    });
})

module.exports = router;