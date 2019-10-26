<template>
    <nav class="navbar bg-blue p-0 fixed-top">
        <div class="p-0" style="width: 100%;">
            <div @click="triggerWelcome()" class="navbar-brand nav-content">
                <div class="d-inline mx-3">
                    <img class="icon d-inline" src="https://cdn.dribbble.com/users/3279894/screenshots/6846234/pp_2x.jpg" alt="ParaPress">
                    <p class="h4 d-inline" onclick="">Para-Press</p>
                </div>
            </div>
            <div @click="triggerLogin()" class="navbar-brand" style="margin-left: 78vw;">
                <div class="d-inline mx-3">
                    <button class="btn btn-light mx-3">
                    <img src="https://img.icons8.com/windows/128/000000/enter-2.png" height="30" width="30">
                    Login
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'PublicNav',
    methods: {
        triggerLogin() {
            this.$emit('responseFromPublicNav', 'login')
        },
        triggerWelcome() {
            this.$emit('responseFromHomeBtn', 'welcome')
        }
    }
}
</script>

<style>

</style>