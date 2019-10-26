const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
const quoteSchema = new Schema({
    quote: String,
    author: String,
    user_id: ObjectId
})

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote