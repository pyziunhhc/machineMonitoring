const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const Stats = require('../../models/Stats');
const LockedMachines = require('../../models/LockedMachines');
const LoggedUser = require('../../models/LoggedUser')
const {
    clearCookies
} = require('../../helpers/authUser')

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
                    removeLoggedUser(user, res, req);
                } else {
                    removeLoggedUser(user, res, req);
                }
            })
        } else {
            removeLoggedUser(user, res, req)
        }
    })

})


const removeLoggedUser = (user, res, req) => {
    LoggedUser.findOneAndDelete({
        user: user
    }, (err, document) => {
        if (document) {
            clearCookies(res, req.cookies)
            res.redirect('/login')
        }
    })
}
module.exports = router;