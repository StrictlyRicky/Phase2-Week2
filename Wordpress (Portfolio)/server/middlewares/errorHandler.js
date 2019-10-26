const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500
    const errorMessage  = err.msg || 'Internal Server Error'

    if (err.name === 'ValidationError') {
        let errors = []
        for (let types in err.errors) {
            errors.push(err.errors[types].message)
        }
        res.json({status: 400, msg: errors })
    } else if (err.msg === 'Please Input A Field') {
        res.json({ status: 400, msg: err.msg })
    } else if (err.msg === 'Article Not Found') {
        res.json({ status: 404, msg: err.msg })
    } else if (err.msg === 'You Must Sign In First!') {
        res.json({ status: 401, msg: err.msg })
    } else if (err.msg === 'User Not Found') {
        res.json({ status: 404, msg: err.msg })
    } else if (err.msg === 'Incorrect Email / Password') {
        res.json({ status: 400, msg: err.msg })
    } else {
        console.log(err)
    }

}

module.exports = errorHandler