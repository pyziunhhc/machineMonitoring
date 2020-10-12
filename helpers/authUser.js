const {
    check
} = require("express-validator");
const LoggedUser = require('../models/LoggedUser')

function authUser(cookie) {
    return new Promise((res, rej) => {
        if (Object.keys(cookie).length) {
            LoggedUser.findOneAndUpdate({
                user: cookie.login
            }, {
                loggedAt: new Date()
            }, (err, document) => {
                if (document) {
                    res(true)
                } else {
                    rej(false)
                }
            })
        } else {
            rej(false)
        }
    })
}

function clearCookies(res, cookies) {
    try {
        if (cookies) {
            for (const [key, value] of Object.entries(cookies)) {
                res.clearCookie(key)
            }
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    authUser,
    clearCookies
}