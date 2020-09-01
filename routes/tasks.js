const express = require('express');
const router = express.Router();
const auth = require('./middleware/authenticate');
const Task = require('../models/Tasks');

router.get('/list', (req, res, next) => {
    Task.find((err, tasks) => {
        if (!err) {
            res.send({
                status: 200,
                tasks: tasks
            })
        }
    })
})
router.post('/addTaskCard', (req, res, next) => {
    const {
        title,
        description,
        status,
        tasks,
        color,
        userWhoCreated,
        userWhoPerforms,
    } = req.body;
    const newTask = new Task({
        title,
        description,
        status,
        tasks,
        color,
        userWhoCreated,
        userWhoPerforms
    });
    newTask.save(err => {
        if (err) {

        } else {
            res.status(200).send({
                status: 200,
                message: ['Dodano nowe zadanie']
            })
        }
    })
})
router.post('/update/addTask', (req, res, next) => {
    req.body.map(task => {
        Task.findByIdAndUpdate(task._id, {
            tasks: task.tasks
        }, (err, res) => {
            console.log(err, res)
        })
    })
})
router.post('/update/removeTask', (req, res, next) => {
    req.body.map(task => {
        Task.findByIdAndUpdate(task._id, {
            tasks: task.tasks
        }, (err, res) => {
            console.log(err, res)
        })
    })

})

router.post('/update/toggleTask', (req, res, next) => {
    req.body.map(task => {
        Task.findByIdAndUpdate(task._id, {
            tasks: task.tasks
        }, (err, res) => {
            console.log(err, res)
        })
    })
})

router.post('/update/changeStatus', (req, res, next) => {
    req.body.map(task => {
        Task.findByIdAndUpdate(task._id, {
            tasks: task.tasks
        }, (err, res) => {
            console.log(err, res)
        })
    })
})
module.exports = router;