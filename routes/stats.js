const express = require('express'),
    router = express.Router();
const Stats = require('../models/Stats');
const LockedMachines = require('../models/LockedMachines');
router.get('/', (req, res, next) => {
    const login = req.cookies.login;
    if (login) {
        res.render('stats', {
            title: 'Statystyki | ITA Tools Sp. z o.o',
            jsfiles: 'Stats/stats.js',
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
        start = req.body.from;
    Stats.findOneAndUpdate({
        machine: name,
        user: user,
        start: {
            $gte: new Date(start)
        }
    }, {
        lockedStats: false
    }, (err, document) => {
        if (document) {
            console.log(start, document.start)
            res.send({
                exist: true,
                start: document.start,
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
        stats.save(error => {
            if (error) {

            } else {
                res.status(200).send({
                    status: 200,
                    start: req.body.start
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
});
router.put('/update', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name,
        start = req.body.start;
    Stats.findOneAndUpdate({
        machine: name,
        user: user,
        start: {
            $gte: start
        },
    }, {
        data: req.body.data
    }, (err, document) => {
        if (document) {
            res.status(200).send({
                status: 200,
                //message: [`Pomyślnie zaktualizowano statystyki dla ${user} \n na maszynie ${name}`]
            })
        }
    })

});
router.delete('/unlock', (req, res, next) => {
    const user = req.cookies.login,
        name = req.body.name;
    LockedMachines.findOneAndDelete({
        name
    }, (err, document) => {
        if (err) {
            console.log(`Błąd ${err}`)
        } else {
            res.status(200).send({
                status: 200,
                message: [`Odblokowano maszynę ${name}`]
            })
        }
    })
});
router.post('/show/all', (req, res, next) => {
    Stats.find((err, data) => {
        if (err) {
            res.send({
                status: 500,
                error: err
            })
        } else {
            if (data.length > 0) {
                res.send({
                    status: 200,
                    res: data
                })
            } else {
                res.status(200).send({
                    status: 200,
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
        if (document.length) {
            res.status(200).send({
                status: 200,
                data: document
            })
        } else {
            res.status(500).send({
                status: 500,
                message: ['Brak statystyk do wyświetlenia za podany okres.']
            })
        }
    })
})



module.exports = router;