<template>
    <section class="container">
        <h1>The datagent example</h1>
        <ul>
            <li v-for="(post, index) in sources.posts" :key="index">
                <nuxt-link :to="{ name: 'posts-id', params:{ id:post.id } }"><div class="post__title">{{ post.title }}</div></nuxt-link>
            </li>
        </ul>
        <footer>
            <button @click="jump(Math.max(--options.condition._page, 1))">prev</button>
            <span> - </span>
            <button @click="jump(++options.condition._page)">next</button>
        </footer>
    </section>
</template>

<script>
import contact from "~/configs/contact.conf";
import PostsModel from "~/models/Posts.model";

const $posts = new PostsModel({ contact });

const condition = { _limit:20, _page: 1 };

function refrash(condition){
    return $posts.fetch(condition)
}

export default {
    async asyncData({ query }){
        const posts = await refrash({ ...condition, ...query })
        return { sources: { posts } }
    },
    async beforeRouteUpdate (to, from, next) {
        this.sources.posts = await refrash({ ...condition, ...to.query })
        next();
    },
    data(){
        return {
            options: {
                condition: { ...condition, ...this.$route.query }
            },
            sources: {}
        }
    },
    methods: {
        async jump(to){
            this.options.condition._page = to;
            this.$router.push({ query: this.options.condition });
        }
    }
}
</script>

<style>
h1{
    font-size: 32px;
    margin: 1em 0;
}
footer{
    margin: 1em 0;
}
</style>
