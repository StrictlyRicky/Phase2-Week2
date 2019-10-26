const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hashPassword } = require('../helpers/bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email Is Required'],
        unique: 'Email Is Already Taken'
    },
    password: {
        type: String,
        required: [true, 'Password Is Required'],
        validate: {
            validator(value) {
                if (value.length < 5 || /[^A-Za-z0-9]+/g.test(value)) {
                    return false
                }
            },
            message: 'Incorrect Password Format'
        }
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User