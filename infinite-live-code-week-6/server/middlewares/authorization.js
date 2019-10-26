const authorization = (req, res, next) => {
        Quote.findOne(
            {
                where: { id: req.params.id }
            }
        )
        .then((quote) => {
            if (quote) {
                if (quote.user_id === req.loggedUser.id) {
                    next()
                } else {
                    next({ status: 401, message: 'You Are Unauthorized!' })
                }
            } else {
                next({ status: 404, message: 'Quote Not Found' })
            }
        }).catch(next)
    }

module.exports = authorization