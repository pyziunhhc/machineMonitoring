const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const emailSettingsSchema = new Schema({
    userID: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    daily: {
        type: Boolean,
        require: true
    },
    monthly: {
        type: Boolean,
        require: true
    }

})

const EmailSettings = mongoose.model('EmailSettings', emailSettingsSchema);

module.exports = EmailSettings;