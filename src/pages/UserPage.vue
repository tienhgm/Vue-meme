<template>
    <div>
        <user-page-info 
            :userInfo="userInfo"
            :countPost="countPost"
        />
        <div 
            v-if="listPostOfUser && listPostOfUser.length"
            v-masonry
            column-width='.grid-sizer'
            transition-duration="0.3s" 
            item-selector=".ass1-section__item"
            class="ass1-section__wrap row ass1-section__isotope-init">
            
            <div class="grid-sizer"></div>
            
            <post-item 
                v-masonry-tile
                v-for="item in listPostOfUser"
                v-bind:key="item.PID"
                v-bind:post="item"
                class="col-lg-6"
            />

        </div>
    </div>
</template>

<script>
import UserPageInfo from '../components/UserPageInfo'
import PostItem from '../components/PostItem'
import { mapActions } from 'vuex'
export default {
    name: 'user-page',
    components: {
        UserPageInfo,
        PostItem
    },
    data(){
        return {
            userid: this.$route.params.id,
            userInfo: null,
            listPostOfUser: []
        }
    },
    watch: {
        $route(to,from){
            this.userid = to.params.id
            this.fetchAllData()
        }
    },
    created(){
        this.fetchAllData()
    },
    computed: {
        countPost(){
            if(this.listPostOfUser && this.listPostOfUser.length){
                return this.listPostOfUser.length
            }
            return 0;
        }
    },
    methods:{
        ...mapActions(['getListPostByUserId', 'getUserById', 'setLoading']),

        async fetchAllData(){
            this.setLoading(true)
            let userid = this.userid

            let promiseUser = this.getUserById(userid)
            let promisePostUser = this.getListPostByUserId(userid)
            let [resultUser, resultPostUser] = await Promise.all([promiseUser, promisePostUser])
             this.setLoading(false)
            if(resultUser.ok && resultPostUser.ok){
                this.userInfo = resultUser.data;
                this.listPostOfUser = resultPostUser.posts
                // Thay đổi data : 
                this.$redrawVueMasonry()
            } else {
                // không cho truy cập vào đây
                this.$router.push('/')
            }
            // console.log('user',resultUser)
            // console.log('posts',resultPostUser)
        }
    }
}
</script>

<style>

</style>