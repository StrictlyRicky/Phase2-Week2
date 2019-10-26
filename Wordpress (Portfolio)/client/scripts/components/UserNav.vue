<template>
    <nav class="navbar bg-blue p-0 fixed-top">
            <div class="p-0">
                <div class="navbar-brand nav-content">
                    <div class="d-inline mx-3">
                        <img class="icon d-inline" src="https://cdn.dribbble.com/users/3279894/screenshots/6846234/pp_2x.jpg" alt="ParaPress">
                        <p class="h4 d-inline">Para-Press</p>
                    </div>
                </div>
            </div>
            <div id="rightTools">
                <button id="addNew" @click="create" class="btn btn-light mx-3"><img class="mr-2" src="https://img.icons8.com/ios/50/000000/add.png" height="30" width="30">Add new site</button>
                <img class="icon mx-3" :src="loggedUser.profile_image" alt="Profile Pic" style="object-position: 0 1%;">
                <button @click="logout" class="btn btn-light mx-3"><img src="https://img.icons8.com/windows/256/000000/exit.png" height="30" width="30">Sign Out</button>
            </div>
    </nav>
</template>

<script>
export default {
    name: 'UserNav',
    props: {
        loggedUser: Object
    },
    data() {
        return {
            count: 0
        }
    },
    methods: {
        logout() {
            this.$emit('responseFromLogoutBtn', 'welcome')
        },
        create() {
            this.count++
            this.$emit('responseFromNav', 'create')
        }
    }
}
</script>

<style>

</style>