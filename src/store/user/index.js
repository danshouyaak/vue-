// 登录与注册用同一个模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'

// import { Promise } from 'core-js'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const getters = {}
const actions = {
    // 获取验证码的接口  是把验证码返回
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('falie'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        // console.log(user);
        let result = await reqUserRegister(user)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
            console.log('ok');
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录业务【token】
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //   console.log(result);
        // token用户的唯一标识
        if (result.code == 200) {
            // console.log(result.data.token);
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            // console.log(result.data);
            commit('GETUSERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 只是向服务器发起请求 通知服务器
        let result = await reqLogout()
        //    console.log(result);
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }

}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
        // console.log(token);
    },
    // 存储用户信息
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录  
    // 把相关信息都清处掉
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}