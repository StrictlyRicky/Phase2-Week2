<template>
    
        <div class="container h-100 form-register">
      <div class="row h-100 justify-content-center align-items-center">

        <div class="card border-success" style="max-width: 18rem;" @mouseover='mouseIn()' @mouseleave="mouseOut()">
        <div class="card-header bg-transparent border-success"><marquee direction='left'>Welcome to The-Project</marquee></div>
        <div class="card-body text-success">
            <form @submit.prevent="uploadImage()"  enctype="multipart/form-data">
            <div class="form-group">
                <label for="exampleFormControlFile1">{{message}}</label>
                <input type="file" ref="file" @change="onSelect()" class="form-control-file" id="exampleFormControlFile1">
                <button class="btn btn-outline-success mt-3">Submit</button>
            </div>
            </form>
        </div>
        </div>
    </div>
    
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name : 'Upload',
    data(){
        return {
            message : 'Upload Your file',
            shared: 0,
            file:""
        }
    },
    methods:{
        mouseIn(){
            this.message = 'Choose File..'
        },
        mouseOut(){
            this.message = 'Upload Your file'
        },
        onSelect(){
            const file = this.$refs.file.files[0]
            this.file = file
        },
        uploadStatusSend(){
            this.$emit('uploadstatus', 'mainBody')
        },
        uploadImage(){
            console.log(this.file)
            const formData = new FormData()
            formData.append("image", this.file)
            console.log(formData)

            Axios({
                method : 'post',
                url : "http://the-project-server.ricky-works.online/file/upload",
                data : formData,
                headers : {
                    token : localStorage.getItem('token')
                },
                config: {headers : {"Content-Type" : "multipart/form-data"}}
                
            })
            .then(({data}) => {
                console.log(data)
                console.log('FileUploded')
                this.uploadStatusSend()
            })
            .catch(err => {
                console.log(err)
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
// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
</script>

<style>
.card{
    text-align : center;
}
.card .card-header{
    font-family:monospace;
    font-size: 30px;
}
.filee{
    margin : 10px auto;
    /* width :105px; */
}
</style>