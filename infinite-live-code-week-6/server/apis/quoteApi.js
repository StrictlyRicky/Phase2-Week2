const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://favqs.com/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token="${process.env.API_KEY}"`,
    }
})

module.exports = instance