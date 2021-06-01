<template>
    <div class="row">
        <div class="col-lg-8">
            <post-list/>
        </div>
        <div class="col-lg-4">
            <side-bar />
        </div>
    </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import SideBar from '../components/SideBar.vue'
import {mapActions} from 'vuex'
export default {
    components: { PostList, SideBar },
    methods:{
        ...mapActions([
            'getListPostHasPaging'
        ])
    },
    // watch $route chỉ chạy khi có thay đổi router
    // Lần load đầu tiên -> không có chạy
    watch: {
        $route(to,from){
            var tagIndex = to.query.tagIndex
            this.getListPostHasPaging({tagIndex: tagIndex})
            // nếu nhảy ra homePage -> tagIndex : undefined
            // nếu nhảy ra homePage có thêm query -> tagIndex : có giá trị
        }
    },
    created(){
        // Nếu về trang chủ tagIndex = undefined thì sẽ load api HasPaging
        var tagIndex = this.$route.query.tagIndex; 
        this.getListPostHasPaging({tagIndex})
    }
}
</script>

<style>

</style>    