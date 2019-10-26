<template>
    <nav class="col-2 bg-white sidebar d-inline" id="sidebar">
        <div>
            <ul class="nav flex-column">
                <li class="nav-item py-2">
                    <a class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/material-outlined/50/000000/home.png" height="30" width="30">
                        Checklist
                    </a>
                </li>
                <li class="nav-item py-2">
                    <a class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/carbon-copy/200/000000/bullish--v1.png" height="30" width="30">
                        Stats
                    </a>
                </li>
                <li class="nav-item py-2">
                    <a class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/metro/104/000000/contract.png" height="30" width="30">
                        Plan
                    </a>
                </li>
                <li class="nav-item py-2">
                    <a @click="setSite" class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/ios/250/000000/pencil-tip.png" height="30" width="30">
                        Site
                        <img v-if="siteStatus" src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" height="20" width="20">
                        <img v-else src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png" height="20" width="20">
                    </a>
                    <ul v-if="siteStatus">
                        <li class="drop hov">Pages</li>
                        <li class="drop hov">Posts</li>
                        <li class="drop hov">Media</li>
                        <li class="drop hov">Comments</li>
                        <li class="drop hov">Feedback</li>
                        <li class="drop hov">Testimonials</li>
                        <li class="drop hov">Portfolio</li>
                    </ul>
                </li>
                <li class="nav-item py-2">
                    <a @click="setDesign" class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/ios-filled/150/000000/design.png" height="30" width="30">
                        Design
                        <img v-if="designStatus" src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" height="20" width="20">
                        <img v-else src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png" height="20" width="20">
                    </a>
                    <ul v-if="designStatus">
                        <li class="drop hov">Customize</li>
                        <li class="drop hov">Themes</li>
                    </ul>
                </li>
                <li class="nav-item py-2">
                    <a @click="setTools" class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/wired/256/000000/maintenance.png" height="30" width="30">
                        Tools
                        <img v-if="toolsStatus" src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" height="20" width="20">
                        <img v-else src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png" height="20" width="20">
                    </a>
                    <ul v-if="toolsStatus" id="tools">
                        <li class="drop hov">Plugins</li>
                        <li class="drop hov">Import</li>
                        <li class="drop hov">Export</li>
                        <li class="drop hov">Marketing</li>
                        <li class="drop hov">Earn</li>
                        <li class="drop hov">Activity</li>
                    </ul>
                </li>
                <li class="nav-item py-2">
                    <a @click="setManage" class="nav-link hov">
                        <img class="mr-2" src="https://img.icons8.com/ios/150/000000/gears.png" height="30" width="30">
                        Manage
                        <img v-if="manageStatus" src="https://img.icons8.com/ios/50/000000/collapse-arrow--v1.png" height="20" width="20">
                        <img v-else src="https://img.icons8.com/ios/50/000000/expand-arrow--v1.png" height="20" width="20">
                    </a>
                    <ul v-if="manageStatus">
                        <li class="drop hov">Domains</li>
                        <li class="drop hov">People</li>
                        <li class="drop hov">Settings</li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "SideBar",
    data() {
        return {
            designStatus: false,
            siteStatus: false,
            toolsStatus: false,
            manageStatus: false
        }
    },
    methods: {
        setSite() {
            this.siteStatus = this.siteStatus ? false : true
        },
        setDesign() {
            this.designStatus = this.designStatus ? false : true
        },
        setTools() {
            this.toolsStatus = this.toolsStatus ? false : true
        },
        setManage() {
            this.manageStatus = this.manageStatus ? false : true
        }
    }
}
</script>

<style>

</style>