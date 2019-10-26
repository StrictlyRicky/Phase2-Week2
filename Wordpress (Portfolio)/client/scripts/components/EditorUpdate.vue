<template>
    <div id="tiny">
        <form @submit.prevent="update(id)" method="post">
                <input class="form-control mb-3" v-model="title" type="text" name="title">
                <tinymce-editor api-key='3xwf6lcx0s6ipq500jnlj84ulxgkf270bp3pc789f4klkjxm' :init="tinyConfig" v-model="content"></tinymce-editor>
            <input class="btn bg-blue" type="submit" value="Edit">
        </form>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import Axios from 'axios'
import Swal from 'sweetalert2';

export default {
    name: 'EditorUpdate',
    props: {
        currentArticle: Object
    },
    data() {
        return {
            title: '',
            content: '',
            id: '',
            tinyConfig: {plugins: 'wordcount'}
        }
    },
    components: {
        'tinymce-editor': Editor
    },
    methods: {
        update(id) {
            const data = {
                title: this.title,
                content: this.content
            }
            console.log(data)
            Axios({
                method: 'PATCH',
                url: `http://localhost:3000/article/${id}`,
                data,
                headers: { token: localStorage.getItem('token') }
            }).then(({ data }) => {
                const { response } = data
                Swal.fire('Congratulations!', response, 'success')
                this.$emit('responseFromUpdate', 'default')
            })
            .catch(console.log)
        }
    },
    mounted() {
        const { title, content, id } = this.currentArticle
        this.title = title
        this.content = content
        this.id = id
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