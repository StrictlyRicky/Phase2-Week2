const Article = require('../models/article.js')


class ArticleController {
    static findAll(req, res, next) {
        const { username } = req.loggedUser
        Article.find({ author: username }).exec()
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(next)
    }
    static findOne(req, res, next) {
        const { id } = req.params
        const { username } = req.loggedUser
        Article.findOne({ _id: id, author: username }).exec()
        .then(article => {
            if (article) {
                res.status(200).json(article)
            } else {
                next({ msg: 'Article Not Found' })
            }
        })
        .catch(next)
    }
    static create(req, res, next) {
        const { title, content, featured_image } = req.body
        const author = req.loggedUser.username
        Article.create({
            title,
            content,
            author,
            featured_image
        })
        .then(_ => {
            res.status(201).json({ response: 'Article Created Successfully' })
        })
        .catch(next)
    }
    static update(req, res, next) {
        const { id } = req.params
        const { username } = req.loggedUser
        let objData = {}
        for (let prop in req.body) {
            if (req.body[prop]) {
                objData[prop] = req.body[prop]
            }
        }
        Article.updateOne({ _id: id, author: username }, objData).exec()
        .then(()=> {
            res.status(200).json({ response: 'Article Updated Successfully' })
        })
        .catch(next)
    }
    static delete(req, res, next) {
        const { id } = req.params
        const { username } = req.loggedUser
        Article.deleteOne({ _id: id, author: username }).exec()
        .then(_=> {
            res.status(200).json({ response: 'Article Deleted Successfully' })
        })
        .catch(next)
    }
    static uploadGCS(req, res, next) {
        const { file } = req.file
        const { id } = req.params
        console.log(file, id)
        Article.updateOne({ _id: id }, { featured_image: file })
    }
}

module.exports = ArticleController