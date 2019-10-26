const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')
const uniqueValidator = require('mongoose-unique-validator')
const { hashPassword } = require('../helpers/bcrypt')
const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Email Format Is Incorrect',
    })
]


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username Is Required'],
        unique: "Username Is Taken"
    },
    email:{
        type: String,
        required: [true, "Email Is Required"],
        unique: "E-mail Is Taken",
        validate: emailValidator
    },
    password: {
        type: String,
        required: [true, 'Password Is Required']
    },
    profile_image: {
        type: String
    }
})

userSchema.pre('save', function(next) {
    this.password = hashPassword(this.password)
    next()
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User