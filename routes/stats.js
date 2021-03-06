const express = require('express'),
    router = express.Router();
const Stats = require('../models/Stats');
const LockedMachines = require('../models/LockedMachines');
const fetch = require('../helpers/fetchFromMainApp');
router.get('/all', (req, res, next) => {
    const login = req.cookies.login;
    if (login) {
        res.render('allStats', {
            title: 'Statystyki | ITA Tools Sp. z o.o',
            jsfiles: 'Stats/All/stats.js',
            cssfiles: 'stats',
            login: login
        })
    } else {
        res.redirect('/login')
    }
})

router.get('/user', (req, res, next) => {
    const login = req.cookies.login;
    if (login) {
        res.render('userStats', {
            title: 'Statystyki | ITA Tools Sp. z o.o',
            jsfiles: 'Stats/User/stats.js',
            cssfiles: 'stats',
            login: login
        })
    } else {
        res.redirect('/login')
    }
})
router.post('/check', (req, res, next) => {
    const login = req.cookies.login,
        name = req.body.name;

    LockedMachines.findOne({
        name,
    }, (err, document) => {

        if (document) {
            if (document.user == login) {
                res.status(200).send({
                    status: 200,
                    new: false,
                    message: [`Witaj ponownie ${login}`]
                })
            } else if (document.user != login) {
                res.status(500).send({
                    status: 500,
                    message: [`Maszyna ${document.name} jest zablokowana \n przez użytkownika ${document.user}.\n\n Proszę wybrać inną.`]
                })
            } else {
                const lockedMachine = new LockedMachines({
                    user: login,
                    date: new Date(),
                    name: req.body.name,
                    statsID: null,
                })
                lockedMachine.save(err => {
                    if (err) {

                    } else {
                        res.status(200).send({
                            status: 200,
                            new: true,
                            message: [`Witaj ${login}`]
                        })
                    }
                })
            }
        } else {
            const lockedMachine = new LockedMachines({
                user: login,
                date: new Date(),
                name: req.body.name
            })
            lockedMachine.save(err => {
                if (err) {

                } else {
                    res.status(200).send({
                        status: 200,
                        new: true,
                        message: [`Witaj ${login}`]
                    })
                }
            })
        }
    })
})
router.post('/checkStats', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name,
        statsID = req.cookies.statsID;
    Stats.findOneAndUpdate({
        machine: name,
        user: user,
        _id: statsID
    }, {
        lockedStats: false
    }, (err, document) => {
        if (document) {
            res.send({
                exist: true,
                data: document.data
            })
        } else {
            res.send({
                exist: false
            })
        }
    })
})
router.post('/save', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name;
    Stats.findOne({
        machine: name,
        user: user,
        lockedStats: false
    }, (err, document) => {
        const stats = new Stats({
            user: user,
            machine: name,
            data: req.body.data,
            start: req.body.start,
            end: null,
            lockedStats: false
        });
        stats.save((error, document) => {
            if (error) {

            } else {
                res.cookie('statsID', document._id, {
                    httpOnly: true,
                    sameSite: true,
                })
                res.status(200).send({
                    status: 200,
                    start: req.body.start,
                })
            }
        })

    })
});
router.post('/lockStats', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name;
    console.log(user, name)
    Stats.findOneAndUpdate({
        machine: name,
        user: user,
        lockedStats: false
    }, {
        lockedStats: true,
        end: new Date()
    }, (err, document) => {
        if (document) {
            res.send({
                status: 200
            })
        }
    })
});
router.get('/locked', (req, res, next) => {
    LockedMachines.find((err, document) => {
        if (err) {

        } else {
            if (document.length > 0) {
                res.status(200).send({
                    status: 200,
                    machines: document
                })
            } else {
                res.status(200).send({
                    status: 200,
                    message: ['Brak zablokowanych maszyn']
                })
            }

        }
    })
});
router.put('/update', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name,
        statsID = req.cookies.statsID;
    Stats.findOneAndUpdate({
        machine: name,
        user: user,
        _id: statsID,
    }, {
        data: req.body.data
    }, (err, document) => {
        if (document) {
            res.status(200).send({
                status: 200,
                statsID: document._id
                //message: [`Pomyślnie zaktualizowano statystyki dla ${user} \n na maszynie ${name}`]
            })
        }
    })

});

router.post('/show/all', (req, res, next) => {
    const start = req.body.start,
        end = req.body.end,
        user = req.body.user;
    console.log(req.body)
    Stats.find({
        start: {
            $gte: new Date(start)
        },
        // end: {
        //     $lte: new Date(end)
        // },
        user: user
    }, (err, data) => {
        if (err) {
            res.send({
                status: 500,
                error: err
            })
        } else {
            if (data.length) {
                res.send({
                    status: 200,
                    data: data
                })
            } else {
                res.status(200).send({
                    status: 500,
                    message: ['W podanym okresie nie ma statystyk do wyświetlenia']
                })
            }

        }
    })
})
router.post('/show/user', (req, res, next) => {
    const user = req.cookies.login,
        start = new Date(req.body.start),
        end = new Date(req.body.end);
    Stats.find({
        user,
        start: {
            $gte: start
        },
    }, (err, document) => {
        console.log(document)
        if (document.length) {
            res.status(200).send({
                status: 200,
                data: document
            })
        } else {
            res.status(500).send({
                status: 500,
                message: ['W podanym okresie nie ma statystyk do wyświetlenia']
            })
        }
    })
})



module.exports = router;