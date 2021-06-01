import store from '../store'
// Router chỉ cho phép vào khi chưa đăng nhập (Login, Register)
const ifNotAuthenticated = (to, from, next) => {

    if(store.getters.isLogin === false){
        next();
    } else {
        next({
            name: 'home-page',
            query: {
                redirect: to.name
            }
        })
    }
}
// Router chỉ cho phép vào khi đã đăng nhập
const ifAuthenticated = (to, from, next) => {

    if(store.getters.isLogin === true){
        next();
    } else {
        next({
            name: 'login',
            query: {
                redirect: to.name
            }
        })
    }
}
export {
    ifAuthenticated, ifNotAuthenticated
}