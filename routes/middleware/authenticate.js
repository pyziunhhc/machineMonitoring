const jwt = require('jsonwebtoken');
const {
    authUser
} = require('../../helpers/authUser')
module.exports = auth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.redirect('/logout')
    } else {
        jwt.verify(token, 'testSecretChangeIt', (err, decoded) => {
            if (err) {
                res.redirect('/logout')
            } else {
                const cookie = authUser(req.cookies)
                cookie.then(auth => {
                        if (auth) {
                            next();
                        }
                    })
                    .catch(error => {
                        res.redirect('/logout')
                    })
                req.login = decoded.login;
                //next();
            }
        })
    }
}