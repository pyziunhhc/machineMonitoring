const express = require('express');
const router = express.Router();
const {
    authUser
} = require('../helpers/authUser')
const Tasks = require('../models/Tasks');
const Messages = require('../models/Notifications');

router.get('/', (req, res, next) => {
    const cookie = authUser(req.cookies);
    cookie.then(auth => {
            if (auth) {
                res.render('works', {
                    title: 'Zadania | Monitoring ITA Tools Sp. z o.o',
                    jsfiles: 'Tasks/controller.js',
                    cssfiles: 'tasks',
                    login: req.cookies.login,
                })
            }
        })
        .catch(error => {
            res.redirect('/login')
        });
})

router.get('/all/list', (req, res, next) => {
    const loggedUser = req.cookies.login;
    Tasks.find((error, tasks) => {
        if (error) {

        }
        if (tasks) {
            const assignedTasks = [],
                myTasks = [];
            tasks.forEach((task, index) => {
                if (task.userWhoCreated == loggedUser) {
                    assignedTasks.push(task)

                }

                task.usersWhoPerforms.forEach(user => {
                    // if (user.name == loggedUser) {
                    //     myTasks.push(task)
                    // }
                })

                if (index == tasks.length - 1) {
                    res.send({
                        status: 200,
                        assignedTasks: assignedTasks,
                        myTasks: myTasks
                    })
                }
            })
        }
    })
})

router.get('/user/list', (req, res, next) => {
    const user = req.cookies.login;
    Tasks.findOne({
        user
    }, (error, document) => {
        if (error) {

        }
        if (document) {
            res.send({
                status: 200,
                message: ['Dodano zadanie']
            })
        }
    })
})

router.post('/add', (req, res, next) => {
    const user = req.cookies.login;
    if (req.body) {
        const title = req.body._title,
            description = req.body._description,
            status = req.body._status,
            tasks = req.body._tasks,
            color = 'rgba (245, 231, 39, 1)',
            usersWhoPerforms = req.body._forWho,
            userWhoCreated = user;

        const newTask = new Tasks({
            title,
            description,
            status,
            tasks,
            color,
            usersWhoPerforms,
            userWhoCreated
        })

        newTask.save((error, document) => {
            if (error) {
                console.log(error)
            }
            if (document) {
                req.body._forWho.forEach(user => {
                    createNotification({
                        user: user.name,
                        message: `Masz nowe zadanie: ${title}`,
                        read: false
                    })
                })
                res.send({
                    status: 200,
                    task: document,
                    message: ['Pomyślnie dodano zadanie']
                })
            }
        })
    }

})

router.put('/update/status', (req, res, next) => {
    const {
        status,
        _id
    } = req.body;
    console.log(req.body)
    Tasks.findOneAndUpdate({
        _id
    }, {
        status: status

    }, (error, task) => {
        if (error) {

        }
        if (task) {
            res.send({
                status: 200
            })
        }
    })


})
router.put('/update/subtasks', (req, res, next) => {
    const {
        _id,
        tasks
    } = req.body;
    console.log(req.body)
    Tasks.findOneAndUpdate({
        _id
    }, {
        tasks

    }, (error, task) => {
        if (error) {

        }
        if (task) {
            res.send({
                status: 200
            })
        }
    })


})

const createNotification = (data) => {
    const notification = new Messages(data);

    notification.save((error, document) => {
        console.log(error, document)
    })

}

module.exports = router;