const User = require('../models/user')
const { encodeToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static login (req, res, next) {
        const { email, password } = req.body
        User.findOne({ email }).exec()
        .then(user => {
            if (user) {
                if (comparePassword(password, user.password)) {
                    console.log(user)
                    const { username, email, password, profile_image } = user
                    const token = encodeToken({ username, email, password, profile_image })
                    res.status(200).json({ username, email, token, profile_image })
                } else {
                    next({ msg: 'Incorrect Email / Password' })
                }
            } else next({ msg: 'Incorrect Email / Password' })
        })
        .catch(next)
    }
    static register (req, res, next) {
        const { username, email, password, profile_image } = req.body
        User.create({ username, email, password, profile_image })
        .then(user => {
            const { username, email, password, profile_image } = user
            const token = encodeToken({ username, email, password, profile_image })
            res.status(201).json({ username, email, token, profile_image })
        })
        .catch(next)
    }
    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const { token } = req.body
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            const { email, name } = payload
            User.findOne({ email }).exec()
            .then(user => {
                if (user) {
                    const { username, email, password } = user
                    const token = encodeToken({ username, email, password })
                    res.status(200).json({ username, email, token })
                } else {
                    res.status(200).json({ email, username: name, response: 'User Not Found' })
                }
            })
        })
        .catch(next)
    }
}

module.exports = UserController