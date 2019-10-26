if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')

const app = express()
const PORT = process.env.PORT
const MONGOOSE_URL = process.env.MONGOOSE_URL

mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true, useUnifiedTopology: true})


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => { console.log(`listening at port ${PORT}`) })