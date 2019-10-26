const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please Enter A Title.']
    },
    content: {
        type: String,
        required: [true, 'Please Enter Content.']
    },
    created_at: {
        type: Date
    },
    author: {
        type: String,
        required: [true, 'Author Must Not Be Empty']
    },
    featured_image: {
        type: String
    }
})

articleSchema.pre('save', function(next) {
    if (!this.created_at) {
        const recent = new Date
        this.created_at = recent.toDateString()
    }
    next()
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article