<template>
    <div id="formFormat">
        <form method="post" @submit.prevent="login()">
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email" placeholder="E-mail" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </form>
        <div id="register">
            <button @click="toRegisterPage()" class="btn btn-primary">Register</button>
            <label>Not Yet A Member?</label>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            picture_url: '',
            status: 'off'
        }
    },
    methods: {
        login() {
            const { email, password } = this
            const data = { email, password }
            axios({
                method:"post",
                url:"http://localhost:3000/user/login",
                data
            })
            .then(({ data }) => {
                if (data.msg) {
                    swal.fire('Oops..', data.msg, 'error')
                } else {
                    const { profile_image, username, email, token } = data
                    localStorage.setItem('token', token)
                    const loggedUser = { profile_image, username, email }
                    this.$emit('responseFromLogin', loggedUser)
                    this.status = 'on'
                }
            })
            .catch(console.log)
        },
        onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/gsignin',
                data: { token: id_token }
            })
            .then(({ data }) => {
                console.log(data)
                this.status = 'on'
            })
        },
        signOut() {
            const auth2 = gapi.auth2.getAuthInstance()
            auth2.signOut()
        },
        logout() {
            signOut()
            localStorage.removeItem('token')
            swal.fire('Successfully Logged Out', 'Goodbye!', 'success')
            this.status = 'off'
        },
        toRegisterPage() {
            this.$emit('responseFromTriggerRegisterBtn', 'register')
        }
    }
}
</script>

<style>
#formFormat {
    padding: 25px;
    width: 50vw;
    height: 100vh;
    margin: auto;
}

#register {
    margin-top: 20px;
}
</style>