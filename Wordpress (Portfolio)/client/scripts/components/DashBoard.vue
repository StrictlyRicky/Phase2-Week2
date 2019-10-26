<template>
    <div style="width: 100%" class="d-inline col mt-3">
        <div v-if="status==='default'" class="row">
            <input id="search" type="text" class="form-control" v-model="filterValue" placeholder="Search">
        </div>
        <div v-if="status==='default'" class="row pt-5" style="width: 100%;">
            <div v-for="article in articles" :key="article._id" style="width: 100%;">
                <div class="ml-3 btn-light">
                    <h5>{{ article.title }}</h5>
                    <span v-html="article.content"></span>
                    <span class="badge bg-blue ml-auto prop">{{ dateFormat(article.created_at) }}</span>
                    <div class="col-12 p-2">
                        <button class="btn bg-blue" @click="updateArticle(article.title, article.content, article._id)">Edit</button>
                        <button class="btn bg-blue" @click="deleteArticle(article._id)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="status==='edit'" class="row pt-5" style="width: 100%;">
            <EditorUpdate
                @responseFromUpdate="backToDashboard"
                :currentArticle="currentArticle"
            ></EditorUpdate>
        </div>
        <div v-if="status==='create'" class="row pt-5" style="width: 100%;">
            <EditorCreate
                @responseFromCreate="backToDashboard"
                :currentArticle="currentArticle"
                :status="editorStatus"
            ></EditorCreate>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import EditorUpdate from "./EditorUpdate"
import Swal from 'sweetalert2'
import EditorCreate from './EditorCreate'

export default {
    name: 'DashBoard',
    props: {
        loggedUser: Object,
        editorStatus: String
    },
    data() {
        return {
            filterValue: '',
            currentArticle: null,
            status: 'default',
            articles: []
        }
    },
    components: {
        EditorUpdate,
        EditorCreate
    },
    methods: {
        dateFormat(date) {
            return new Date(date).toDateString()
        },
        updateArticle(title, content, id) {
            const data = { title, content, id }
            this.currentArticle = data
            this.status = 'edit'
            this.fetchArticles()
        },
        deleteArticle(id) {
            Axios({
                method: 'DELETE',
                url: `http://localhost:3000/article/${id}`,
                headers: { token: localStorage.getItem('token') }
            })
            .then(({ data }) => {
                const { response } = data
                Swal.fire('Congratulations!', response, 'success')
                this.fetchArticles()
            })
            .catch(console.log)
        },
        backToDashboard(status) {
            this.status = status
            this.fetchArticles()
        },
        fetchArticles() {
            const token = localStorage.getItem('token')
            Axios({
                method: 'GET',
                url: 'http://localhost:3000/article',
                headers: { token }
            })
            .then(({data}) => {
                this.articles = data
            })
        }
    },
    mounted() {
        this.fetchArticles()
    },
    watch: {
        editorStatus() {
            this.status = this.editorStatus
            this.fetchArticles()
        },
        status() {
            this.fetchArticles()
        }
    }
}
</script>

<style>
#search {
    width: 40%;
}

.bg-blue {
    background-color: #006088 !important;
    color: white !important;
}
</style>