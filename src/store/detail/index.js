import { reqGoodsInfo } from '@/api/index'

const state = {
    goodInfo : {}
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200){
            commit('GETGOODINFO',result.data)
        }
    }
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
// 简化数据而生
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView
        //  || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}