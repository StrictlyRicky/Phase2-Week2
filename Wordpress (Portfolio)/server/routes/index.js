const router = require('express').Router()
const articleRouter = require('./articleRouter')
const userRouter = require('./userRouter')

router.get('/', (req, res) => {
    res.redirect('/user/login')
})
router.use('/article', articleRouter)
router.use('/user', userRouter)

module.exports = router