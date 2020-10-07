const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const serverSchema = new Schema({
    ip: {
        type: String,
        require: true
    },
    port: {
        type: Number,
        require: true
    },
    apiVersion: {
        type: Number,
        require: true,
    },
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    testMode: {
        type: Boolean,
        require: true,
    }

})

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;