<template>
     <div class="ass1-section__content">
        <p>{{post.post_content}}</p>
        <div class="ass1-section__image">
            <router-link 
                :to="getPostLink"
            >   
                <img :src="post.url_image" :alt="post.post_content"
            ></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'post-item-content',
    props:{
		post: { type: Object, default: null } 
	},
    computed:{
        getPostLink(){
            return { name:'post-detail',params: {id: this.post.PID} }
        }
    }
}
</script>

<style>

</style>