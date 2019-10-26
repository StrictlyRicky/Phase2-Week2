<template>
    <div id="formFormat">
        <form method="post" @submit.prevent="register()" class="my-auto mx-auto">
            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Username" required>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="email" placeholder="E-mail" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password" required>
            </div>
            <div class="form-group">
                <label>Profile Picture</label>
                <input type="file" class="form-control-file">
            </div>
            <button type="submit" class="btn btn-primary d-inline">Submit</button>
        </form>
            <div id="login">
                <button @click="toLoginPage()" class="btn btn-primary">Login</button>
                <label>Registered Already?</label>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    name: 'Register',
    props: [

    ],
    data() {
        return {
            username: '',
            email: '',
            password: '',
            profile_image: ''
        }
    },
    methods: {
        register(image) {
            this.profile_image = image || 'https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png'
            const { username, email, password, profile_image } = this
            const data = { username, email, password, profile_image}
            axios({
                method:"post",
                url:"http://localhost:3000/user/register",
                data
            })
            .then(({ data }) => {
                const { msg, username, email, token, profile_image } = data
                if (msg) {
                    swal.fire('Oops..', msg[0], 'error')
                } else {
                    localStorage.setItem('token', token)
                    const loggedUser = { username, email, profile_image }
                    this.$emit('responseFromRegister', loggedUser)
                }
            })
            .catch(console.log)
        },
        toLoginPage() {
            this.$emit('responseFromTriggerLoginBtn', 'login')
        }
    }
}
</script>

<style>
#formFormat {
    padding: 25px;
    width: 50vw;
    margin: auto;
}

#login {
    margin-top: 20px;
}
</style>