<template>
    <div class="search-page">
        <div class="search-info">
            <h3>Từ khóa tìm kiếm: <strong>{{query}}</strong></h3>
            <p>Tìm kiếm được {{this.listPostSearch.length}} bài viết</p>
            <p>Nội dung bài viết </p>
          
        </div>
        <div 
            v-if="listPostSearch && listPostSearch.length"
            v-masonry
            column-width='.grid-sizer'
            transition-duration="0.3s" 
            item-selector=".ass1-section__item"
            class="ass1-section__wrap row ass1-section__isotope-init">
            
            <div class="grid-sizer"></div>
            
            <post-item 
                v-masonry-tile
                v-for="item in listPostSearch"
                v-bind:key="item.PID"
                v-bind:post="item"
                class="col-lg-6"
            />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import PostItem from '../components/PostItem'
export default {
    name: 'search',
    components:{
        PostItem
    },
    data(){
        return {
            query: this.$route.query.query,
            listPostSearch:[]
        }
    },
    methods:{
        ...mapActions(['getListPostSearch']),
        checkQuery(){
            if(!this.query){
                this.$router.push('/')
            }
        },
        fetchDataSearch(){
            if(this.query){     
                this.getListPostSearch(this.query).then(res => {
                    if(res.ok){
                        this.listPostSearch = res.posts
                        // Thay đổi data : 
                        this.$redrawVueMasonry()
                    }
                })
            }
        }
    },
    watch: {
        $route(to,from){
            // console.log(to)
            this.query = to.query.query
            this.checkQuery()
            this.fetchDataSearch()
        }
    },
    created(){
        this.checkQuery()
        this.fetchDataSearch()
    }
}
</script>

<style>
    .search-page{
        margin-top: 44px;
    }
    .search-info{
        margin-bottom: 20px;
    },
    mark, .mark {
        background-color: yellowgreen;
        padding: 0
    }
</style>