<template>
    <div class="mb-3">
        <nav class="navbar fixed-top navbar-expand-sm bg-light navbar-light">
            <a class="navbar-brand main-title" @click="toHomeFromNav()">The Project</a>
            <div class="ml-auto">
            <button v-if="loginStatus" @click="sendUploadBtnResponseToParent()" type="button" class="btn btn-info btn-sm">Upload</button>
            <button v-if="!loginStatus" @click="sendLoginBtnResponseToParent('login')" type="button" class="btn btn-primary btn-sm">Login</button>
            <button v-if="loginStatus" @click="sendLogoutBtnResponseToParent()" type="button" class="btn btn-primary btn-sm">Logout</button>
            <!-- <button v-if="login" type="button" class="btn btn-primary btn-sm">MyImage</button> -->
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Nav',
    props:{
        loginStatus : Boolean
    },
    data() {
        return {
            // login : false //ini harus datang dari parent
        }
    },
    methods:{
        sendLogoutBtnResponseToParent(){
            localStorage.removeItem('token')
            this.$emit('logoutResponseFromChildNav', false)
        },
        sendLoginBtnResponseToParent(type){
            this.$emit('loginBtnResponseFromChildNav',type)
        },
        sendUploadBtnResponseToParent(){
            this.$emit('uploadBtnResponseFromChildNav', "upload")
        },
        toHomeFromNav(){
            console.log('adasdsa');
            this.$emit('toHomeFromNavResponse', "mainBody")
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');
    .main-title{
    font-family: 'Mansalva', cursive;
    }
</style>