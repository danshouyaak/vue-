import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api/index'
// 引入发请求的API
// reqFloorlist

//这是home模块的小仓库
const state = {
    //state中的数据默认初始值不能乱写，服务器返回的是对象，初始值就是对象【初始值根据接口的返回值来定】
    categoryList: [],

    //轮播图的数组
    bannerList: [],
    floorList: []
}
//mutations是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }


}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }

    },
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        // console.log(result);
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}