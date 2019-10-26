<template>
    <div class="h-100">
        <UserNav
            v-if="formType==='main'"
            :loggedUser="loggedUser"
            @responseFromLogoutBtn="logout"
            @responseFromNav="create"
        ></UserNav>
        <PublicNav
            v-else
            @responseFromPublicNav="triggerForm"
            @responseFromHomeBtn='triggerForm'
        ></PublicNav>
        <div id="contentBody">
            <Register
                v-if="formType==='register'"
                @responseFromRegister="registerSuccess"
                @responseFromTriggerLoginBtn="triggerForm"
            ></Register>
            <Login
                v-if="formType==='login'"
                @responseFromLogin="loginSuccess"
                @responseFromTriggerRegisterBtn="triggerForm"
            ></Login>
            <Welcome
                v-if="formType==='welcome'"
            ></Welcome>
            <div class="row">
            <SideBar
                v-if="formType==='main'"
            ></SideBar>
            <Dashboard
                v-if="loggedUser && formType==='main'"
                :loggedUser="loggedUser"
                :editorStatus="editorStatus"
            ></Dashboard>
            </div>
        </div>
    </div>
</template>

<script>
import UserNav from "./components/UserNav"
import Register from "./components/Register"
import Login from "./components/Login"
import PublicNav from "./components/PublicNav"
import Welcome from "./components/Welcome"
import SideBar from "./components/SideBar"
import Dashboard from "./components/DashBoard"

export default {
    data() {
        return {
            loggedUser: null,
            formType: 'welcome',
            editorStatus: null
        }
    },
    components : {
        PublicNav,
        UserNav,
        Register,
        Login,
        Welcome,
        SideBar,
        Dashboard
    },
    methods: {
        registerSuccess(loggedUser) {
            this.loggedUser = loggedUser
            this.formType = 'main'
        },
        loginSuccess(loggedUser) {
            this.loggedUser = loggedUser
            this.formType = 'main'
        },
        triggerForm(status) {
            this.formType = status
        },
        logout(pageStatus) {
            this.formType = pageStatus
            localStorage.removeItem('token')
            this
        },
        create(status) {
            this.editorStatus = status
        }
    },
    mounted() {
        if (!this.loggedUser) {
            localStorage.removeItem('token')
        }
    }
}
</script>

<style>
.h-100 {
    height: 100%
}
#contentBody {
    margin-top: 60px;
}
</style>