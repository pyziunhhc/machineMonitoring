const express = require('express');
const router = express.Router();
const {
    authUser
} = require('../helpers/authUser');
const User = require('../models/User');
const Email = require('../models/Email');
const {
    check
} = require('express-validator');
const machineTypes = [{
    machineName: 'WPD4_2065-6307',
    type: 'Ostrzenie-Erodowanie'
}, {
    machineName: 'WPD3_2064-6839A',
    type: 'Ostrzenie-Erodowanie'
},
{
    machineName: 'WPD2_2064-6678',
    type: 'Ostrzenie-Erodowanie'
},
{
    machineName: 'WES1_2066-5215',
    type: 'Ostrzenie-VHM'
},
{
    machineName: 'WES2_2066-5264',
    type: 'Ostrzenie-Wiertła VHM'
},
{
    machineName: 'WES3_2066-5263FS',
    type: 'Ostrzenie-Wiertła VHM'
},
{
    machineName: 'WBA1_2067-0330',
    type: 'Ostrzenie-VHM'
},
{
    machineName: 'WBA2_2067-2244',
    type: 'Produkcja-VHM'
},
{
    machineName: 'WEV1_2066-4001',
    type: 'Produkcja-Erodowanie'
},
{
    machineName: 'WEV2_2066-4038',
    type: 'Produkcja-Erodowanie'
},
{
    machineName: 'DMG_NTX-1000',
    type: 'Produkcja-Korpusy'
},
{
    machineName: 'WP1_2065-6306',
    type: 'Produkcja-VHM'
},

]
router.get('/', (req, res, next) => {
    const cookie = authUser(req.cookies);
    cookie.then(auth => {
            if (auth) {
                res.render('reports', {
                    title: 'Raporty | ITA Tools Sp. z o.o',
                    jsfiles: '/Reports/controller.js',
                    cssfiles: 'reports',
                    login: req.cookies.login
                })
            }
        })
        .catch(error => {
            res.redirect('/login')
        });
})
router.get('/mail', (req, res, next) => {
    const cookie = authUser(req.cookies);
    cookie.then(auth => {
        if (auth) {
            res.render('mail', {
                title: 'Raporty mailowe | ITA Tools Sp. z o.o',
                jsfiles: '/Reports/Mail/controller.js',
                cssfiles: 'mail',
                login: req.cookies.login
            })
        }
    }).catch(error => {
        console.log(error)
        res.redirect('/login')
    })

})

router.get('/mail/users', (req, res, next) => {
    getUsers()
        .then(users => {
            checkAvailable(users)
                .then(data => {
                    res.send({
                        status: 200,
                        data: data
                    })
                })
        })
})


router.put('/mail/users/update', (req, res, next) => {
    const user = req.body.user,
        daily = req.body.daily,
        monthly = req.body.monthly;
    console.log(req.body)
    Email.findOne({
        user: user.user,
    }, (error, document) => {
        if (error) {

        } else if (document) {
            Email.findOneAndUpdate({
                user: document.user
            }, {
                daily: daily,
                monthly: monthly
            }, (error, document) => {
                console.log(error, document)
            })
        } else {
            const newUser = new Email({
                user: user.user,
                userID: user.userID,
                email: user.email,
                daily: daily,
                monthly: monthly
            })
            newUser.save((error, document) => {
                console.log(error, document)
            })
        }
    })
})


function getUsers() {
    return new Promise((resolve, reject) => {
        User.find((error, users) => {
            if (users.length) {
                resolve(users)
            }
            if (error) {
                reject(error)
            }
        })
    })
}

function checkAdded(user) {
    return new Promise((resolve, reject) => {
        Email.findOne({
            user: user.login,
            email: user.email,
        }, (error, document) => {
            if (error) {
                reject(error)
            }

            if (document) {
                if (document.monthly && document.daily) {
                    resolve({
                        user: document,
                        available: false,
                        monthly: true,
                        daily: true
                    })
                }
                if (document.daily && !document.monthly) {
                    resolve({
                        user: document,
                        available: true,
                        daily: true,
                        monthly: false
                    })
                }
                if (document.monthly && !document.daily) {
                    resolve({
                        user: document,
                        available: true,
                        daily: false,
                        monthly: true
                    })
                }
                if (!document.monthly && !document.daily) {
                    resolve({
                        user: document,
                        available: true,
                        daily: false,
                        monthly: false
                    })
                }
            } else {
                resolve({
                    user: {
                        userID: user._id,
                        user: user.login,
                        email: user.email
                    },
                    available: true
                })
            }
        })
    })
}

function checkAvailable(users) {
    return new Promise((resolve, reject) => {
        let daily = [],
            monthly = [],
            available = [];
        users.forEach((user, index) => {
            checkAdded(user)
                .then(res => {
                    if (res.daily) {
                        daily.push(res.user)
                    }
                    if (res.monthly) {
                        monthly.push(res.user)
                    }
                    if (res.available) {
                        available.push(res.user)
                    }

                    if (users.length - 1 == index) {
                        //console.log('Dzienny', daily, 'Miesieczny', monthly, 'Dostepni', available)
                        resolve({
                            daily: daily,
                            monthly: monthly,
                            available: available
                        })
                    }
                })

        })
    })
}
module.exports = router;