<template>
    <div class="ass1-section__head">
        <router-link :to="getUserLink" class="ass1-section__avatar ass1-avatar"><img :src="getAvatar" alt=""></router-link>
        <div>
            <router-link :to="getUserLink" class="ass1-section__name">{{ post.fullname }}</router-link>
            <span class="ass1-section__passed">{{formatTimeAdded}}</span>
        </div>
        <router-link :to="getUserLink" class="ass1-section__link ass1-btn-icon"><i class="icon-Link"></i></router-link>
    </div>
</template>


<script>
import moment from 'moment'
export default {
    name: 'post-item-head',
    props:{
		post: { type: Object, default: null}
	},
    computed: {
        getAvatar(){
            if(this.post.profilepicture) return this.post.profilepicture;
            return '/dist/images/avatar-02.png';
        },
        getUserLink(){
            let userid = this.post.USERID || 1;
            return {name: 'user-page', params: {id: userid}}
        },
        formatTimeAdded(){
            moment.locale('vi');
            return moment(this.post.time_added).fromNow()
        }
    }
}
</script>

<style>
    .ass1-section__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .ass1-section__name {
        text-transform: capitalize;
    }
</style>