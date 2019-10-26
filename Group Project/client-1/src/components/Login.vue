<template>
    <div class="container h-100 form-login">
      <div class="row h-100 justify-content-center align-items-center">
        <form @submit.prevent="login()" class="col-10">
        <h1 class="text-left mb-5 main-title">TheProject</h1>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="loginForm.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="loginForm.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-success">Login</button>
          <button v-if="login" @click="sendRegisterBtnResponseToParent('register')" type="button" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name : 'Login',
  data(){
    return{
      loginForm:{
        email:"",
        password:""
      },
      loginStatus: false
    }
  },
  props : {
    
  },
  methods : {
    login(){
      axios({
        method:"post",
        url:"http://the-project-server.ricky-works.online/user/login",
        data : {
          email : this.loginForm.email,
          password : this.loginForm.password
        }
      })
      .then(({data}) => {
        console.log(data);
        localStorage.setItem("token", data.token)
        this.loginStatus = true,
        this.$emit("login-status", this.loginStatus)
      })
      .catch(err => {
        console.log(err);
        this.loginStatus = false,
        this.$emit("login-status", this.loginStatus)
        Swal.fire({
          title: 'Awwwwwwwww!',
          text: 'Wrong password/email.',
          type: 'error'
        })
      })
    },
    sendRegisterBtnResponseToParent(type){
      this.$emit('registerBtnResponseFromChildNav',type)
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');
  body,html{
    height:100%;
  }
  .form-login{
    background-color: #c6dee1;
  }
  .main-title{
    font-family: 'Mansalva', cursive;
  }
  .swal2-container.swal2-shown {
    background-color: #f27474 !important;
  }
</style>