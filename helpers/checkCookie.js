const {
    check
} = require("express-validator");

function checkCookie(cookie) {
    console.log(cookie)
    return Object.keys(cookie).length ? true : false;
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
    checkCookie,
    clearCookies
}