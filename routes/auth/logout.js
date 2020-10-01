const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const Stats = require('../../models/Stats');
const LockedMachines = require('../../models/LockedMachines');
const {
    clearCookies
} = require('../../helpers/checkCookie')

router.get('/', (req, res, next) => {
    const user = req.cookies.login;
    LockedMachines.findOneAndDelete({
        user
    }, (err, document) => {
        if (err) {
            console.log(`Błąd ${err}`)
        } else if (document) {
            Stats.findOneAndUpdate({
                user: user,
                lockedStats: false
            }, {
                lockedStats: true,
                end: new Date()
            }, (err, document) => {
                if (document) {
                    clearCookies(res, req.cookies)
                    res.redirect('/login')
                } else {
                    clearCookies(res, req.cookies)
                    res.redirect('/login')
                }
            })
        } else {
            clearCookies(res, req.cookies)
            res.redirect('/login')
        }
    })

})

module.exports = router;