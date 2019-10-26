<template>
  <div class="h-100">

    <Nav 
      @loginBtnResponseFromChildNav="loginResponseReceived"
      :login-status="login"
      @logoutResponseFromChildNav="logoutResponseReceived"
      @uploadBtnResponseFromChildNav="uploadResponseReceived"
      @toHomeFromNavResponse="toHome"
    ></Nav>
    <Login @login-status="loginStatusChange" @registerBtnResponseFromChildNav="registerResponseReceived" v-if="formType==='login'" ></Login>
    <Register v-else-if="formType==='register'"></Register>
    <Upload @uploadstatus="verifyUpload" v-else-if="formType==='upload'"></Upload>

    <!-- Body of content -->
    <div v-else-if="formType==='mainBody'" class="container" style="margin-top:4.7rem">
      <div class="row" v-for="(imageData,index) in imageDatas" :key="index">
        <ImageCard 
        :imageid="imageData._id" 
        :sourcelink="imageData.url" 
        :rating="imageData.averageRating"
        @responseRatedSuccessFromImageCard="ratedResponse"
        ></ImageCard>  
      </div>
    </div>

    
  </div>
</template>

<script>
import Login from './components/Login'
import Nav from './components/Nav'
import Register from './components/Register'
import ImageCard from './components/ImageCard'
import Upload from './components/Upload'

import Axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data(){
    return{
      imageDummys : ["https://www.uxpincdn.com/studio/wp-content/uploads/2017/12/image9.png","https://cdn.dribbble.com/users/1055394/screenshots/4689149/elemental_agency_ui_design_from_healthy_app.png", "https://lvivity.com/wp-content/uploads/2019/03/ux-app-design.jpg"],
      imageDatas : [],
      formType : "mainBody",
      login: false,
      msgRated: 0
    }
  },
  components : {
    Login,
    Nav,
    Register,
    ImageCard,
    Upload
  },
  methods:{
    fetchImageData(){
      Axios({
        method : 'get',
        url : 'http://the-project-server.ricky-works.online/file/find'
      })
      .then(({data}) => {
        console.log(data)
        this.imageDatas = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    loginResponseReceived(loginresponse){
      console.log(loginresponse)
      this.formType = loginresponse
    },
    registerResponseReceived(registerResponse){
      console.log(registerResponse)
      this.formType = registerResponse
    },
    loginStatusChange(loginStatus){
      console.log(loginStatus)
      this.login = loginStatus
      if (this.login === true) this.formType = 'mainBody'
      this.fetchImageData()
    },
    logoutResponseReceived(loginStatus){
      this.login = loginStatus
    },
    uploadResponseReceived(uploadResponse){
      this.formType = uploadResponse
    },
    ratedResponse(){
      this.msgRated++
      this.fetchImageData()
    }, 
    verifyUpload(params){
      console.log(params)
      this.formType = params
      this.fetchImageData()
    },
    toHome(params){
      this.formType = params
      this.fetchImageData()
    }
  },
  created(){
    if(localStorage.getItem('token')) this.login = true
    this.fetchImageData()
  },
  watch : {
    msgRated(){
      this.fetchImageData()
    }
  }
}
</script>

<style>
  body{
    background-color: #cee1c6 !important;
  }
</style>