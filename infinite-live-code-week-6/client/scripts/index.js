new Vue({
    el: '#app',
    data: {
        email : '',
        password: '',
        random : [],
        quotes: [],
        status: 'off',
        user : null,
        form: 'login'
    },
    methods: {
        triggerRegister() { this.form = 'register' },
        triggerLogin() { this.form = 'login' },
        login() {
            const data = { email: this.email, password: this.password }
            axios({
                method: 'post',
                data,
                url: 'http://localhost:3000/login'
            })
            .then(({ data }) => {
                if (data.message) {
                    throw new Error(data.message)
                }
                else {
                    this.user = data
                    this.status = 'on'
                    localStorage.setItem('token', data.access_token)
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        register() {
            const data = { email: this.email, password: this.password }
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data
            })
            .then(({ data }) => {
                this.triggerLogin()
            })
            .catch(console.log)
        },
        logout() {
            this.status = 'off'
            this.user = null
        },
        findAllQuotes() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/quotes',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({ data }) => {
                this.quotes = data
            })
            .catch(console.log)
        },
        generateRandom() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/quotes/random',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(({data}) => {
                this.random = data
            })
        },
        addToFavorites(quoteData) {
            const { quote, author } = quoteData
            axios({
                method: 'post',
                url: 'http://localhost:3000/quotes',
                headers: { token: localStorage.getItem('token') },
                data: { quote, author }
            })
            .then(() => {
                console.log('Added Successfully')
                this.findAllQuotes()
            })
            .catch(console.log)
        },
        removeFavorites(quoteData, _id) {
            const { quote, author } = quoteData
            axios({
                method: 'delete',
                url: `http://localhost:3000/quotes/${_id}`,
                headers: { token: localStorage.getItem('token') },
                data: { quote, author }
            })
            .then(() => {
                console.log('Deleted Successfully')
                this.findAllQuotes()
            })
            .catch(console.log)
        }
    },
    mounted() {},
    watch: {
        status() {
            this.findAllQuotes()
            this.generateRandom()
        }
    }
})