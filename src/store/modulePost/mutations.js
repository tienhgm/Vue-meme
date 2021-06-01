export default {
    SET_LIST_POSTS(state, data) {
        state.listPosts = data;
    },
    PUSH_LIST_POSTS(state, data){
        state.listPosts = [...state.listPosts, ...data];
    },
    SET_POST_DETAIL(state,data){
        state.postDetail = data
    }
}

//TH 1: currPage = 1-> thay thế array gốc
// TH 2: currPage = 2 3 4 -> Đẩy thêm dữ liệu vào ( nối 2 array lại với nhau )