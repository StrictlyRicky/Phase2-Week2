// if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
// }
// REQUIRES
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler.js')
const morgan = require('morgan')
// const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const app = express()
const PORT = process.env.PORT || 3000
const mongoose_URL = process.env.MONGOOSE_URL
// console.log(mongoose_URL)
mongoose.connect(mongoose_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    err ? console.log(err) : console.log('connected to mongoose')
})

// MIDDLEWARES
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan('tiny'))
//app.use(redirectToHTTPS())
app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, _=> { console.log(`Listening at port ${PORT}`) })