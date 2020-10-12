const express = require('express'),
    router = express.Router();
const {
    authUser
} = require('../helpers/authUser')



router.get('/', (req, res, next) => {
    const cookie = authUser(req.cookies);
    cookie.then(auth => {
            if (auth) {
                res.render('operator', {
                    title: 'Tryb operatora | ITA Tools Sp. z o.o',
                    jsfiles: 'Operator/operator.js',
                    cssfiles: 'operator',
                    login: req.cookies.login
                })
            }
        })
        .catch(error => {
            res.redirect('/login')
        });


})


module.exports = router;