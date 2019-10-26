const { decodeToken } = require('../helpers/jwt')
const User = require('../models/user')

const authentication = (req, res, next) => {
    try {
        const { token } = req.headers
        const loggedUser = decodeToken(token)
        req.loggedUser = loggedUser
        next()
    } catch (err) {
        next({ status: 401, msg: 'You Must Sign In First!' })
    }
}

const authorization = (req, res, next) => {
    User.findOne({ username: req.loggedUser.username })
    .then((user) => {
        if (user) {
            next()
        } else {
            next({ status: 404, msg: 'You Must Sign In First!' })
        }
    })
    .catch(next)
    }

module.exports = { authentication, authorization }