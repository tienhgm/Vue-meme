import { parseJwt } from '../../helpers'
import { CONFIG_ACCESS_TOKEN } from '../../constants'
export default {
    // check xem co user login khong
    isLogin: state => {
        let userObj = parseJwt(state[CONFIG_ACCESS_TOKEN])
        if (userObj) {
            return true;
        } else {
            return false;
        }
    },
    currentUser: state => {
        return state.currentUser;
    },
    getListPostOfCurrentUser: state => {
        if (state.currentUser) {
            let userCurrentId = state.currentUser.USERID
            return state.posts[userCurrentId];
        }
        else {
            return null
        }
    }
}