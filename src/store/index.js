import Vue from "vue";
import Vuex from 'vuex'
//需要使用插件
Vue.use(Vuex)

// 小仓库引入到大仓库
import home from './home'
import search from './search'
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

const state = { b: 1 }
const mutations = {}
const actions = {}
const getters = {}


//对外暴露Store的实例
export default new Vuex.Store({
    modules: {
        state,
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})