const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const lockedMachinesSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    name: {
        type: String,
        require: true
    }

})

const LockedMachine = mongoose.model('LockedMachine', lockedMachinesSchema);

module.exports = LockedMachine;