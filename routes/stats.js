const express = require('express'),
    router = express.Router();
const Stats = require('../models/Stats')



router.post('/save', (req, res, next) => {
    const login = req.cookies.login;
    const stats = new Stats({
        user: login,
        data: req.body.data,
        date: req.body.date,
        lockedMachine: req.body.lockedMachine,
        lockedStats: req.body.lockedStats
    })
    Stats.findOne({
        lockedMachine: true
    }, (err, res) => {
        console.log(err, res)
        if (res.lockedMachine) {
            res.status(500).send({
                status: 500,
                message: [`Maszyna zablokowana, przez użytkownika ${res.name} proszę wybrać inną`]
            })
        } else {
            stats.save(err => {
                if (err) {
                    if (err.code == 11000) {
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
                    res.status(200)
                        .send({
                            status: 200,
                            id: stats._id
                        })
                    return true;
                }
            })
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

router.post('/find', (req,res,next)=>{
    Stats.find((err,data)=>{
        if(err){
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