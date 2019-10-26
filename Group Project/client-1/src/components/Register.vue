<template>
    <div class="container h-100 form-register">
      <div class="row h-100 justify-content-center align-items-center">
        <form @submit.prevent="register()" class="col-10">
        <h1 class="text-left mb-5 main-title">Register TheProject</h1>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="registerForm.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="registerForm.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name : 'Register',
  data(){
    return{
      registerForm:{
        email:"",
        password:""
      },
      formType: "login"
    }
  },
  props : {
    
  },
  methods : {
    register(){
      axios({
        method:"post",
        url:"http://the-project-server.ricky-works.online/user/register",
        data : {
          email : this.registerForm.email,
          password : this.registerForm.password
        }
      })
      .then(data => {
        console.log(data)
        this.loginStatus = true
        this.$emit("login-status", this.formType)
      })
      .catch(err => {
        // this.$emit("login-status", this.loginStatus)
        console.log(err.response);
        // console.log(err);
        Swal.fire({
          title: 'Awwwwwwwww!',
          text: err.response.data[" email"] || err.response.data[" password"]  || "Error",
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');
  body,html{
    height:100%;
  }
  .form-register{
    background-color: #cee1c6;
  }
  .main-title{
    font-family: 'Mansalva', cursive;
  }
  .swal2-container.swal2-shown {
    background-color: #f27474 !important;
  }
</style>