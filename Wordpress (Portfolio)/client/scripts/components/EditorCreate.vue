<template>
    <div id="tiny">
        <form @submit.prevent="create()" method="post">
                <input class="form-control mb-3" v-model="title" type="text" name="title">
                <tinymce-editor api-key='3xwf6lcx0s6ipq500jnlj84ulxgkf270bp3pc789f4klkjxm' :init="tinyConfig" v-model="content"></tinymce-editor>
                <input type="file" ref="file" @change="onSelect()">
            <input class="btn bg-blue" type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Axios from 'axios'
import Swal from 'sweetalert2';

export default {
    name: 'EditorCreate',
    data() {
        return {
            file: '',
            title: '',
            content: '',
            tinyConfig: {plugins: 'wordcount'}
        }
    },
    components: {
        'tinymce-editor': Editor
    },
    methods: {
        create() {
            const data = {
                title: this.title,
                content: this.content
            }
            Axios({
                method: 'post',
                url: `http://localhost:3000/article`,
                data,
                headers: { token: localStorage.getItem('token') }
            }).then(({ data }) => {
                const { response } = data
                Swal.fire('Congratulations!', response, 'success')
                this.$emit('responseFromCreate', 'default')
            })
            .catch(console.log)
        }
        // onSelect() {
        //     const file = this.$refs.file.files[0]
        //     this.file = file
        // },
        // uploadGCS(file) {
        //     const formData = new FormData()
        //     formData.append('file', file)
        //     Axios({
        //         method: 'POST',
        //         url: 'http://localhost:3000/article/uploadGCS',
        //         data: formData,
        //         headers : { token : localStorage.getItem('token') },
        //         config: {headers : {"Content-Type" : "multipart/form-data"}}
        //     })
        //     .then(console.log)
        //     .catch(console.log)
        // }
    }
}
</script>

<style>
#tiny {
    width: 100%;
    height: 80vh;
}
.tox-notification {
    display: none;
}
.tox {
    height: 70vh !important;
}
</style>