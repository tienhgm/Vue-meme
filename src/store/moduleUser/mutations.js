import Vue from 'vue'
import { CONFIG_ACCESS_TOKEN } from '../../constants'
export default {
    // lưu user vào mảng users 
    SET_USER_INFO(state, user) {
        Vue.set(state.users, user.USERID, user);
        //  object, key, value
    },
    SET_USER_POSTS(state, { userid, posts }) {
        Vue.set(state.posts, userid, posts);
        //  object, key, value
    },
    SET_LOGOUT(state) {
        state[CONFIG_ACCESS_TOKEN] = ''
        state.currentUser = null,
        localStorage.removeItem(CONFIG_ACCESS_TOKEN)
    },
    SET_LOGIN_INFO(state, { user = null, token = '' }) {
        localStorage.setItem(CONFIG_ACCESS_TOKEN, token)
        state[CONFIG_ACCESS_TOKEN] = token,
        state.currentUser = user
    },
    SET_CURRENT_USER(state, user){
        state.currentUser = user;
    }
}