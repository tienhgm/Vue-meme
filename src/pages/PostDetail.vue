<template>
 <!--sections-->
    <div class="row">
        <div class="col-lg-8">
            <div class="ass1-section__post-detail" v-if="getDataPostDetail && getDataPostDetail.post">
                <div class="ass1-section">
                    <!--item-->
                    <post-item :post="getDataPostDetail.post" />
                    
                    <!-- end item -->
                    <!-- feeling -->
                    <!-- <post-feeling /> -->
                    
                    <!-- end feeling -->
                    <!-- <post-feeling /> -->
                    <div class="list-categories">
                        <h5><strong>Danh mục: </strong></h5>
                        <ul>
                            <li v-for="item in getDataPostDetail.categories" v-bind:key="item.TAG_ID">
                            <router-link v-bind:to="getLinkCategory(item)">{{ item.tag_value }}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- add comment -->
                <post-add-comment/>
                <!-- end add comment -->

                <!-- comment -->
                <post-comments/>
                <!-- end comment -->
            </div>
        </div>
        <div class="col-lg-4">
            <side-bar/>
        </div>
    </div>
</template>

<script>
import PostAddComment from '../components/PostAddComment.vue'
import PostComments from '../components/PostComments.vue'
import PostFeeling from '../components/PostFeeling.vue'
import PostItem from '../components/PostItem.vue'
import SideBar from '../components/SideBar.vue'

import { mapActions, mapGetters } from 'vuex'
import { removeVietnameseFromString } from '../helpers'
export default {
    name:'post-detail',
    data(){
        return {
            postId: this.$route.params.id
        }
    },
    components: { SideBar, PostItem, PostFeeling,PostAddComment ,PostComments },
    watch: {
        '$route' (to,from){
            this.postId = to.params.id,
            this.fetchDataPostDetail();
        }
    },
    created(){
        //Load lại trang lần đầu tiên
        this.fetchDataPostDetail();
    },
    computed:{
        ...mapGetters(['getDataPostDetail'])
    },
    
    methods:{
        ...mapActions(['getPostDetailById']),
        fetchDataPostDetail(){
            this.getPostDetailById(this.postId).then(res => {
                if(!res.ok){
                    //Đẩy qua trang chủ nếu id k hợp lệ
                    // console.log(this.$router)
                    this.$router.push('/')
                }
            })
        },
        getLinkCategory(category){
            return {
                name: 'home-page',
                query: {
                    text: removeVietnameseFromString(category.tag_value),
                    tagIndex: category.tag_index
                }
            }
        }
    }

}
</script>

<style>
    .ass1-section__post-detail {
        margin-top: 44px;
    }
    .ass1-section__post-detail .ass1-section .ass1-section {
        box-shadow: none;
        padding: 0;
        border-bottom: solid 1px #f3f3f3;
    }
    .list-categories {
        padding-bottom: 20px;
    }
    .list-categories ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    }
    .list-categories ul li {
        margin: 5px;
    }
    .list-categories ul li a {
        color: #333;
        font-size: 14px;
        display: block;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 3px 10px;
        transition: all .3s ease;
    }
    .list-categories ul li a:hover {
        background-color: #333;
        border-color: #333;
        color: #fff;
    }
    /* .ass1-section__post-detail > .ass1-section {
        padding: 0;
    } */
</style>