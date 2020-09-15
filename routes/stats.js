const express = require('express'),
    router = express.Router();
const Stats = require('../models/Stats');
const LockedMachines = require('../models/LockedMachines');
const e = require('express');



router.post('/save', (req, res, next) => {
    const login = req.cookies.login,
        name = req.body.name;

    LockedMachines.findOne({
        name
    }, (err, document) => {
        if (document) {
            if (document.user == login) {
                res.status(200).send({
                    status: 200,
                    message: [`Witaj ponownie ${login}`]
                })
            } else if (document.user != login) {

                res.status(500).send({
                    status: 500,
                    message: [`Maszyna ${document.name} zablokowana przez użytkownika ${document.user}.\n Proszę wybrać inną`]
                })
            } else {
                const stats = new Stats({
                        user: login,
                        name: req.body.name,
                        data: req.body.data,
                        date: req.body.date,
                        isLocked: req.body.isLocked
                    }),
                    lockedMachine = new LockedMachines({
                        user: login,
                        date: new Date(),
                        name: req.body.name
                    })
                lockedMachine.save(err => {
                    if (err) {

                    }
                })
                stats.save(err => {
                    if (err) {
                        if (err.code == 11000) {
                            console.log(`Błąd podczas zapisu statystyk do bazy ${err}. Wpis istnieje w bazie`)
                            res.status(500)
                                .send({
                                    status: 500,
                                    message: ['Wpis istnieje w bazie']
                                })
                            return false;
                        }

                        res.status(500)
                            .send({
                                status: 500,
                                message: ['Błąd zapisu w bazie']
                            })
                        return false;
                    } else {
                        console.log(`Zapisano poprawnie ${stats}`)
                        res.status(200)
                            .send({
                                status: 200,
                                id: stats._id
                            })
                        return true;
                    }
                })
            }
        } else {
            const stats = new Stats({
                    user: login,
                    name: req.body.name,
                    data: req.body.data,
                    date: req.body.date,
                    isLocked: req.body.isLocked
                }),
                lockedMachine = new LockedMachines({
                    user: login,
                    date: new Date(),
                    name: req.body.name
                })
            lockedMachine.save(err => {
                if (err) {
                    console.log(`Błąd podczas blokowania maszyny! ${err}`)
                }
            })
            stats.save(err => {
                if (err) {
                    if (err.code == 11000) {
                        console.log(`Błąd podczas zapisu statystyk do bazy ${err}.\n Wpis istnieje w bazie`)
                        res.status(500)
                            .send({
                                status: 500,
                                message: ['Wpis istnieje w bazie']
                            })
                        return false;
                    }
                    console.log(`Błąd podczas zapisu statystyk do bazy ${err}`)
                    res.status(500)
                        .send({
                            status: 500,
                            message: ['Błąd zapisu w bazie']
                        })
                    return false;
                } else {
                    console.log(`Zapisano poprawnie ${stats}`)
                    res.status(200)
                        .send({
                            status: 200,
                            message: [`Witaj ${login}`]
                        })
                    return true;
                }
            })
        }

    })

})
router.post('/locked', (req, res, next) => {
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
})
router.put('/update', (req, res, next) => {
    if (!req.body.locked) {
        Stats.findOneAndUpdate({
            _id: req.body.id
        }, {
            data: req.body.data
        })
    } else {
        Stats.findOneAndUpdate({
            _id: req.body.id
        }, {
            data: req.body.data,
            lockedMachines: req.body.lockedMachines,
            lockedStats: req.body.lockedStats
        })
    }

})
router.delete('/unlock', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name;
    LockedMachines.findOneAndDelete({
        user,
        name
    }, (err, document) => {
        if (err) {
            console.log(`Błąd ${err}`)
        } else {
            console.log(`Odblokowano maszynę ${name}`)
            res.status(200).send({
                status: 200,
                message: [`Odblokowano maszynę ${name}`]
            })
        }
    })
})
router.post('/find', (req, res, next) => {
    Stats.find((err, data) => {
        if (err) {
            res.send({
                status: 500,
                error: err
            })
        } else {
            res.send({
                status: 200,
                res: data
            })
        }
    })
})




module.exports = router;