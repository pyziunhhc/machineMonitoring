const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})
userSchema.pre('save', function(next) {
    const document = this;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(document.password, salt, (err, hash) => {
            if (err) {
                next(err)
            } else {
                document.password = hash;
                next()
            }
        })
    })
})
const User = mongoose.model('User', userSchema)

module.exports = User;