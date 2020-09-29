const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userStatsSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    machine: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    lockedStats: {
        type: Boolean,
        require: true
    }

})

const Stats = mongoose.model('Stats', userStatsSchema);

module.exports = Stats;