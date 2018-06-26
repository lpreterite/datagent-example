<template>
    <section class="container">
        <h2>edit: {{ sources.title }}</h2>
        <form action="">
            <div>
                <label for="">title: </label><br>
                <input type="text" v-model="sources.post.title">
            </div>
            <div>
                <label for="">body: </label><br>
                <textarea v-model="sources.post.body" cols="30" rows="10"></textarea>
            </div>
            <div>
                <button @click="$router.back()">&lt; back</button>
            </div>
        </form>
    </section>
</template>
<script>
import contact from "~/configs/contact.conf";
import PostsModel from "~/models/Posts.model";

const $posts = new PostsModel({ contact });

export default {
    async asyncData({ params }){
        const post = await $posts.find(params.id);
        return { sources: { post, title: post.title } }
    },
    async beforeRouteUpdate (to, from, next) {
        this.sources.post = await $posts.find(to.params.id);
        this.sources.title = this.sources.post.title;
        next();
    },
    data(){
        return {
            sources: { post:{} }
        }
    }
}
</script>

<style scoped>
h2{
    margin: 1.5em 0;
}
</style>

