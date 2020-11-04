const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        require: true
    }
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;