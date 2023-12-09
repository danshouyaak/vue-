import { reqAddressInfo, reqOrderInof } from '@/api/index'

const state = {
    address: [],
    orderInfo : {}
}
const mutations = {
    GETUSERADDRESS(state, address) {
        // console.log(address);
        state.address = address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        // 等待成功
        // console.log(result);
        if (result.code === 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    // 获取用户商品清单信息
    async getOrder({ commit }) {
        let result = await reqOrderInof()
        // console.log(result);
        if(result.code === 200){
            commit('GETORDERINFO',result.data)
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