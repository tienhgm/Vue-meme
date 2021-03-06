import axiosInstance from '../../plugins/axios'
import { parseJwt } from '../../helpers'
import { CONFIG_ACCESS_TOKEN } from '../../constants'
export default {
    async getUserById({ commit }, userid) {
        try {
            let result = await axiosInstance.get('/member/member.php?userid=' + userid)
            // console.log(result)
            if (result.data.status === 200) {

                commit('SET_USER_INFO', result.data.user)
                return {
                    ok: true,
                    data: result.data.user,
                    error: null
                }
            }
            return {
                ok: false,
                error: error.message
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async login({ commit, dispatch }, { email = '', password = '' }) {
        commit('SET_LOADING', true);
        try {
            let data = {
                email: email,
                password: password
            }
            var result = await axiosInstance.post('/member/login.php', data);

            commit('SET_LOADING', false);
            if (result.data.status === 200) {

                commit('SET_USER_INFO', result.data.user);
                commit('SET_LOGIN_INFO', result.data);

                dispatch('getListPostsByUserId', result.data.user.USERID);

                return {
                    ok: true,
                    error: null,
                    data: result.data
                }

            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }

        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async checkLogin({ commit, dispatch }) {
        try {
            let tokenLocal = localStorage.getItem(CONFIG_ACCESS_TOKEN)
            let userObj = parseJwt(tokenLocal)
            // console.log(userObj)
            if (userObj) {
                //check xem co ton tai user k
                // let resultUser = await dispatch('getUserById', userObj.id)
                // load lai trang goi API getListPost USERID
                // let resultPostUser = await dispatch('getListPostByUserId', userObj.id)

                //Gi??? s??? d??ng 65 ch???y trong 3s
                // D??ng 67 ch???y 4s 
                // => ch??? 7s 
                // M?? 2 API tr??n ch???y ri??ng l??? ??c kh??ng? v?? n?? k li??n quan nhau ( 2 API ?????C L???P )
                // Ta d??ng PromiseAll <- c??ng c??? gi??p ta ch???y to??n b??? Promise c??ng 1 l??c trong c??ng 1 kho???ng th???i gian
                let promiseUser = dispatch('getUserById', userObj.id)
                let promisePostUser = dispatch('getListPostByUserId', userObj.id)
                let [resultUser, resultPostUser] = await Promise.all([promiseUser, promisePostUser])

                if (resultUser.ok && resultPostUser.ok) {
                    let data = {
                        user: resultUser.data,
                        token: tokenLocal
                    }
                    commit('SET_LOGIN_INFO', data)
                    return {
                        ok: true,
                        error: null
                    }
                }
            }
            return {
                ok: false
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async logout({ commit }) {
        commit('SET_LOGOUT')
        return null;
    },
    async getListPostByUserId({ commit }, userid) {
        try {
            let config = {
                params: {
                    userid: userid
                },
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                }
            }
            let result = await axiosInstance.get('/post/getListPostUserID.php', config)
            if (result.data.status === 200) {
                let objData = {
                    posts: result.data.posts,
                    userid: userid
                }
                commit('SET_USER_POSTS', objData)
                return {
                    ok: true,
                    error: null,
                    posts: result.data.posts || []
                }
            }
            return {
                ok: false,
                error: null,
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async register({ commit }, data) {
        commit('SET_LOADING', true)
        try {

            let result = await axiosInstance.post('/member/register.php', data)
            commit('SET_LOADING', false)
            if (result.data.status === 200) {
                console.log(result)
                // Th??nh c??ng d??? li???u result tr??? v???: Token && user
                // this.$router.push('/login')
                return {
                    ok: true,
                    error: null,
                    data: result.data
                }
            } else {
                return {
                    ok: false,
                    error: result.data.error
                }
            }
        } catch (error) {
            commit('SET_LOADING', false)
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async updateProfile({ commit }, { fullname = '', description = '', gender = '', objectFile = null }) {
        commit('SET_LOADING', true);
        try {
            var bodyFormData = new FormData();
            bodyFormData.append('fullname', fullname)
            bodyFormData.append('description', description)
            bodyFormData.append('gender', gender)
            if (objectFile) {
                bodyFormData.append('avatar', objectFile);
            }
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                },

            }
            let result = await axiosInstance.post('/member/update.php', bodyFormData, config);
            commit('SET_LOADING', false);
            if (result.data.status === 200) {
                commit('SET_CURRENT_USER', result.data.user)
                return {
                    ok: true,
                    user: result.data.user
                }
            }
            return {
                ok: false,
                error: result.data.error
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok: false,
                error: error.message
            }
        }
    },
    async changePassword({ commit }, data) {
        commit('SET_LOADING', true);
        try {
            let config = {
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN)
                    },
            }
            let result = await axiosInstance.post('/member/password.php', data, config);
            commit('SET_LOADING', false);
            if(result.data.status === 200) {
                return {
                    ok:true,
                    message: result.data.message
                }
            }
            return {
                ok:false,
                error: result.data.error
            }
        } catch (error) {
            commit('SET_LOADING', false);
            return {
                ok:false,
                error: error.message
            }
        }
    }
}