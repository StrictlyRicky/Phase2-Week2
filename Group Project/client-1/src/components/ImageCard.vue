<template>

  <div class="col-12 mb-4">
    <div class="card" style="">
      <img :src="sourcelink" class="card-img-top" alt="">
      <div class="card-body">
        <form @submit.prevent="giveRating()">
          <div class="form-group">
            <label for="exampleFormControlSelect1">Give rate into this image:</label>
            <select v-model="ratingValue" class="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button href="#" class="btn btn-danger">Vote!</button>
          <button type="button" class="btn btn-secondary btn" disabled> <span><img src="https://image.flaticon.com/icons/svg/1040/1040230.svg" class="mb-1" style="width:15px;height:15px;"></span>{{rating.toFixed(1)}}</button>
        </form>
        <div class="fb-share-button" 
            :data-href="sourcelink" 
            data-layout="button_count">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name : 'ImageCard',
  data(){
    return{
      shared: 0,
      ratingValue:""
    }
  },
  props : {
    sourcelink : String,
    rating : Number,
    imageid : String
  },
  methods : {
    share(d, s, id) {
      this.shared++
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
      fjs.parentNode.insertBefore(js, fjs);
    },
    giveRating(){
      Axios({
        method : 'post',
        url: `http://the-project-server.ricky-works.online/file/rate/${String(this.imageid)}`,
        data : {
          rating : this.ratingValue
        }
      })
      .then(({data}) => {
        this.$emit('responseRatedSuccessFromImageCard', data.msg)
        Swal.fire(
          'Done!',
          data.msg,
          'success'
        )
      })
      .catch(err => {
        Swal.fire(
          'Undone!',
          'Something Wrong!',
          'error'
        )
      })
    }
  },
    mounted() {
      this.share(document, 'script', 'facebook-jssdk')
    },
    watch: {
      shared() {
        this.share(document, 'script', 'facebook-jssdk')
      }
    }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Mansalva&display=swap');
  /* body,html{
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
  } */
</style>