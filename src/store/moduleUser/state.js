import { CONFIG_ACCESS_TOKEN } from '../../constants'
export default {
    // ACCESS_TOKEN:'',
    [CONFIG_ACCESS_TOKEN]: localStorage.getItem(CONFIG_ACCESS_TOKEN),
    currentUser: null, //login
    users: {},
    posts: {}
}
/*
    users: {
        [userid]: [value -> dữ liệu của user đó]
    }

    posts: {
        [userid]
    }

    var userid = 20
    users[userid]

*/ 