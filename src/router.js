import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from './pages/HomePage.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import UserProfile from './pages/UserProfile.vue'
import UserPage from './pages/UserPage.vue'
import PostUpload from './pages/PostUpload.vue'
import PostDetail from './pages/PostDetail.vue'
import ChangePassword from './pages/ChangePassword.vue'
import Search from './pages/Search.vue'

import { ifNotAuthenticated, ifAuthenticated} from './plugins/authenticate'
Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        name: 'home-page',
        component: HomePage 
    },
    { 
        path: '/login', 
        name: 'login',
        component: Login,
        // router khong yeu cau dang nhap
        beforeEnter: ifNotAuthenticated
    },
    { 
        path: '/register', 
        name: 'register',
        component: Register,
        // router khong yeu cau dang nhap
        beforeEnter: ifNotAuthenticated
    },
    { 
        path: '/user/:id', 
        name: 'user-page',
        component: UserPage,
        beforeEnter: ifAuthenticated
    },
    { 
        path: '/user/profile/:id', 
        name: 'user-profile',
        component: UserProfile,
        beforeEnter: ifAuthenticated
    },
    { 
        path: '/user/password/:id', 
        name: 'change-password',
        component: ChangePassword,
        beforeEnter: ifAuthenticated
    },
    { 
        path: '/post-detail/:id', 
        name: 'post-detail',
        component: PostDetail,
    },
    { 
        path: '/upload', 
        name: 'upload',
        component: PostUpload,
        beforeEnter: ifAuthenticated 
    },
    { 
        path: '/search', 
        name: 'search',
        component: Search,
       
    },

   
]

const router = new VueRouter({
    // mode: 'history',
    routes 
})

export default router;
  
// Router chỉ cho phép vào khi chưa đăng nhập (Login, Register)
// Router chỉ cho phép vào khi đã đăng nhập
// Router cho phép vào thoải mái