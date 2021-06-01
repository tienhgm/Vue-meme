<template>
    <div class="ass1-head-user" v-if="userInfo">
        <div class="ass1-head-user__content">
            <div class="ass1-head-user__image"><a href="#"><img :src="getAvatar" alt=""></a></div>
            <div class="ass1-head-user__info">
                <div class="ass1-head-user__info-head">
                    <div class="ass1-head-user__name">
                        <span>{{userInfo.fullname}}</span> 
                       
                    </div>
                    <div class="w-100"></div>
                    <a v-if="!isCurrentUser" href="#" class="ass1-head-user__btn-follow ass1-btn">Theo dõi</a>

                    <template v-else> 
                        <router-link 
                            :to="{ name: 'change-password', params: { id: userInfo.USERID }}" 
                            class="ass1-head-user__btn-follow ass1-btn">Đổi mật khẩu</router-link>
                        <router-link 
                            :to="{ name: 'user-profile', params: { id: userInfo.USERID }}" 
                            class="ass1-head-user__btn-follow ass1-btn">Profile</router-link>
                    </template>
                    <!-- <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> -->
                </div>
                <div class="ass1-head-user__info-statistic">
                    <div class="ass1-btn-icon"><i class="icon-Post"></i><span>Bài viết: {{countPost}}</span></div>

                    <!-- <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> -->
                </div>
                <p>{{userInfo.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'user-page-info',
    props: {
        userInfo: { type: Object, default: null},
        countPost: {type: Number, default: 0}
    },
    computed: {
        ...mapGetters(['currentUser']), 
        isCurrentUser(){
            if(this.userInfo && this.currentUser){
                if(this.userInfo.USERID === this.currentUser.USERID) return true;
            }
            return false
        },
        getAvatar(){
			if(this.userInfo.profilepicture){
				return this.userInfo.profilepicture;
			} else {
				return '/dist/images/avatar-09.png';
			}
		}
    }
}
</script>

<style>

</style>