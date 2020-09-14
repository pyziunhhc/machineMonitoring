const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userStatsSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    lockedMachine: {
        type: Boolean,
        require: true,
    },
    lockedStats: {
        type: Boolean,
        require: true
    }

})

const Stats = mongoose.model('Stats', userStatsSchema);

module.exports = Stats;