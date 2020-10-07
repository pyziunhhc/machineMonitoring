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
    },
    statsID: {
        type: String,
    }

})

const LockedMachine = mongoose.model('LockedMachine', lockedMachinesSchema);

module.exports = LockedMachine;