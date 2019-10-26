const router = require('express').Router()
const User = require('../models/user')
const Quote = require('../models/quote')
const { encodeToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const quoteAPI = require('../apis/quoteApi')
const authentication = require('../middlewares/authentication')


router.post('/register', (req, res, next) => {
    const { email, password } = req.body
    User.create({ email, password })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(next)
})
router.post('/login', (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email }).exec()
    .then(user => {
        if (user && comparePassword(password, user.password)) {
            const { _id, email, password } = user
            const token = encodeToken({ _id, email, password })
            res.status(200).json({ access_token: token })
        }
        else {
            next({ message: 'Incorrect Email / Password' })
        }
    })
    .catch(next)
})

router.use(authentication)

router.get('/quotes/random', (req, res, next) => {
    let quotesData = []
    quoteAPI.get('/quotes').then(({ data }) => {
        const { quotes } = data
        for (let i = 0; i < 4; i++) {
            quotesData.push({ quote: quotes[i].body, author: quotes[i].author })
        }
        res.status(200).json(quotesData)
    })
    .catch(next)
})
router.get('/quotes', (req, res, next) => {
    Quote.find().exec()
    .then(quotes => {
        res.status(200).json(quotes)
    })
    .catch(next)
})

router.post('/quotes', (req, res, next) => {
    const { quote, author } = req.body
    const { _id } = req.loggedUser
    Quote.findOne({ quote }).exec()
    .then(quoteData => {
        if (quoteData) throw new Error('Quote already Taken')
        else {
            Quote.create({ user_id: _id, quote, author })
            .then(quote => {
                res.status(201).json(quote)
            })
        }
    })
    .catch(next)
})

router.delete('/quotes/:id', (req, res, next) => {
    const { id } = req.params
    Quote.deleteOne({ _id:  id}).exec()
    .then(res.status(200).json({ _id: id }))
    .catch(next)
})

module.exports = router