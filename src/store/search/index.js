//这是search模块的小仓库
import { reqGetSearchInfo } from '@/api'
const state = {
    searchList: {},
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // params形参：是当前用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
// 计算属性
// 项目中getter主要的作用是简化仓库中的数据（简化数据而生）
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便】
const getters = {
    // 当前形参state，是当前仓库中的state，并非大仓库中的state
    goodsList(state) {
        // 假如网络不给力 没有网路state.searchList.goodsList应该返回得到是一个数组  最起码是一个空数组  不然是undefined 会报错
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}