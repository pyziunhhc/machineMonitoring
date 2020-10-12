const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const loggedUserSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    loggedAt: {
        type: Date,
        require: true
    }

})

const LoggedUser = mongoose.model('LoggedUser', loggedUserSchema);

module.exports = LoggedUser;