const express = require('express');
const router = express.Router();
const {
    authUser
} = require('../helpers/authUser');
const User = require('../models/User');
const Email = require('../models/Email');
const {
    getStatuses,
    getMachines,
    getGroups
} = require('../helpers/fetchFromMainApp');
const {
    summaryMachineStatistics
} = require('../helpers/processStatuses/process');
const auth = require('../routes/middleware/authenticate');
const {
    parseMillisecondsIntoReadableTime
} = require('../helpers/helpers');
router.get('/', auth, (req, res, next) => {
    res.render('reports', {
        title: 'Raporty | ITA Tools Sp. z o.o',
        jsfiles: '/Reports/controller.js',
        cssfiles: 'reports',
        login: req.cookies.login
    })
})
router.post('/data/get/summary', (req, res, next) => {
    try {
        const machines = req.body.machines,
            FROM = req.body.from,
            TO = req.body.to,
            data = [];
        machines.forEach((machine, index) => {
            const NAME = machine.name;
            getStatuses(NAME, FROM, TO)
                .then(data => {
                    const SUMMARY = summaryMachineStatistics(data, FROM, TO);
                    return {
                        data: SUMMARY,
                        name: NAME
                    };
                }).then(val => {
                    data.push({
                        data: val.data,
                        name: val.name
                    })
                    if (data.length == machines.length) {
                        const sortedData = data.sort((a, b) => {
                            if (a.name > b.name) {
                                return 1
                            } else {
                                return -1;
                            }
                        })
                        let final = [];

                        sortedData.forEach((val, index) => {
                            console.time('mozetu?'+index)
                            let statuses = [];
                            let sumOfTimes = val.data.sumOfTimes.data.time;
                            Object.values(val.data)
                                .filter(val => {
                                    return val.data.time > 0;
                                })
                                .filter(val => {
                                    return val.data.show;
                                })
                                .filter(val => {
                                    val.data.percentage = ((val.data.time * 100) / sumOfTimes).toFixed(2);
                                    return val;
                                })
                                .forEach((val, index) => {
                                    statuses.push({
                                        status: val.displayName,
                                        time: parseMillisecondsIntoReadableTime(val.data.time),
                                        percentage: `${val.data.percentage}`,
                                        color: val.colors.argb
                                    })

                                })
                            final.push({
                                machineName: val.name,
                                data: statuses
                            })
                            console.timeEnd('mozetu?'+index)
                            if (index == sortedData.length - 1) {
                                res.send({
                                    status: 200,
                                    data: final,
                                })
                            }
                        })


                    }
                })
        })
    } catch (e) {
        console.log(e)
    }

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