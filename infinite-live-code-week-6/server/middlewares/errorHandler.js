module.exports =
    (err, req, res, next) => {
        const statusCode = err.status || 500
        const errorMessage = err.msg || 'Internal Server Error'
        res.json(err)
        console.log(err)
    }