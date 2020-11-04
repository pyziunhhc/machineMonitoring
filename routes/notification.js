const express = require('express');
const Message = require('../models/Notifications');
const router = express.Router();
const Notifications = require('../models/Notifications')

router.post('/get', (req, res, next) => {
    const user = req.cookies.login;
    Notifications.find({
        user
    }, (error, document) => {
        if (error) {
        }
        if (document) {
            const nonReadedNotification = [];
            document.forEach((notification, index) => {
                if (!notification.read) {
                    nonReadedNotification.push(notification)
                    if (index == document.length - 1) {
                        res.send({
                            status: 200,
                            notifications: nonReadedNotification
                        })
                    }

                }
            })

        }
    })
})
router.put('/update', (req, res, next) => {
    const {
        _id,
        read
    } = req.body;

    Notifications.findOneAndUpdate({
        _id
    }, {
        read
    }, (error, document) => {
        console.log(error, document)
    })
})

module.exports = router;