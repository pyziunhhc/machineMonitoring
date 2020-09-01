const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tasks: [{
        id: Number,
        name: String,
        done: Boolean,
        edit: Boolean
    }],
    color: {
        type: String,
        required: true,
    },
    userWhoCreated: {
        type: String,
        required: true
    },
    userWhoPerforms: {
        type: String,
        required: true
    }

})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;