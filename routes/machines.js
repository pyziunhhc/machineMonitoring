const express = require('express'),
    router = express.Router();
const LockedMachines = require('../models/LockedMachines');

const {
    getGroups,
    getMachines,
    getStatuses
} = require('../helpers/fetchFromMainApp');
const {
    machineTypes
} = require('../config/machineTypes.js')
router.post('/get', (req, res, next) => {

    let machinesArray = [];
    getGroups()
        .then(groups => {
            const firstHall = groups[0].name;
            getMachines(firstHall)
                .then(machines => {
                    for (let i = 0; i < machines.length; i++) {
                        machineTypes.map(machine => {
                            if (machine.name == machines[i].name) {
                                machinesArray.push({
                                    name: machine.name,
                                    type: machine.type
                                })
                            }
                        })
                    }
                    return machinesArray;
                }).then(machines => {
                    res.send({
                        machines: machines
                    })
                })
        })
        .catch(error => {
            console.log(error)
        })
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
module.exports = router;