import {reqCartList} from '@/api/index'
const state = {
    cartList:[]
}
const actions = {
    // 获取购物车信息
    async getCartList({ commit }) {
        let result = await reqCartList()
        if(result.code == 200){
            commit('GETCARLIST',result.data)
        }
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
        // 至少返回一个空对象
    },

}
const mutations = {
    GETCARLIST(state,cartList){
        state.cartList = cartList
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}