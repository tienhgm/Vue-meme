import axiosInstance from '../../plugins/axios'
import { PAGE_SIZE, CURRENT_PAGE } from '../../constants'
export default {
    // GET List POST 
    async getListPostHasPaging({ commit }, { pagesize = PAGE_SIZE, currPage = CURRENT_PAGE, tagIndex = null }) {
        commit('SET_LOADING', true)
        try {
            var config = {
                params: {
                    pagesize,
                    currPage
                }
            }
            if(tagIndex){
                config.params.tagIndex = tagIndex;
                var result = await axiosInstance.get('/post/getListByCategory.php', config)
            } else {
                var result = await axiosInstance.get('/post/getListPagination.php', config)
            }   
            commit('SET_LOADING', false)
            
            if(result.data.status == 200){
                if(currPage === 1 ){
                    commit('SET_LIST_POSTS', result.data.posts)
                } else if(currPage > 1) {
                    commit('PUSH_LIST_POSTS', result.data.posts)
                }

            } else {
                console.log("error", result.data.error)
            }

        } catch (error) {
            commit('SET_LOADING', false)
            console.log(error)
        }
    },
    async getPostDetailById({ commit, dispatch }, postid){
        commit('SET_LOADING', true)
        try {
            var result = await axiosInstance.get('/post/post.php?postid='+  postid)
            commit('SET_LOADING', false)
            if(result.data.status === 200){
                // console.log('result=', result.data)
                //Goi tiep API USER
                var resultUser = await dispatch('getUserById', result.data.data.post.USERID)

                commit('SET_LOADING', false)    

                commit('SET_POST_DETAIL', result.data.data)
                return {
                    ok: true,
                    data: result.data.data,
                    error: null
                }
            }
        } catch(error) {
            commit('SET_LOADING', false)
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async getListPostSearch({commit}, searchString){
        commit('SET_LOADING', true)
        try {
            var result = await axiosInstance.get('/post/search.php?query='+  searchString)
            commit('SET_LOADING', false)
            if(result.data.status === 200 ){
                return {
                    ok: true,
                    posts: result.data.posts
                }
            }
        } catch (error) {   
            commit('SET_LOADING', false)
            return {
                ok: false,
                error: error.message
            }
        }
    }
  
}