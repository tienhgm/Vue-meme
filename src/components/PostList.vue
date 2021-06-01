<template>
    <div class="ass1-section__list">
        <post-item 
            v-for="item in getListPosts" 
            :key="item.PID" 
            :post="item"
        />
        <button class="load-more ass1-btn" 
            @click="handleLoadMore"
            v-if="getListPosts && getListPosts.length"

        >
            <span>Xem thêm</span>
        </button>
        <h3 v-else>Danh sách rỗng</h3>
    </div>

</template>

<script>
import PostItem from './PostItem.vue'
import { mapGetters, mapActions } from 'vuex'
import { PAGE_SIZE, CURRENT_PAGE } from '../constants'
export default {
    components: { PostItem }, 
    name: 'post-list',
    data(){
        return {
            pagesize: PAGE_SIZE,
            currPage: CURRENT_PAGE,
            tagIndex: parseInt(this.$route.query.tagIndex) // vì kia trả về chuỗi phải ép kiểu  
        }
    },
    watch: {
        $route(to,from){
           this.tagIndex = to.query.tagIndex
           this.currPage = 1
        }
    },
    computed: {
        ...mapGetters([
            'getListPosts'
        ])
    },
    methods:{
        ...mapActions([
            'getListPostHasPaging'
        ]),
        handleLoadMore(){
            //
            this.currPage = this.currPage + 1;
            let obj = {
                pageSize: this.pageSize,
                currPage: this.currPage,
                tagIndex: this.tagIndex
            }
            // console.log(this.$route)
            // console.log(obj)
            this.getListPostHasPaging(obj)

        }
    }
}
</script>

<style>

</style>