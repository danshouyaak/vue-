import { reqGoodsInfo ,reqAddOrUpdateShopCart} from '@/api/index'
import {getUUID} from '@/utils/uuid_token'  // 封装游客身份模块uuid ---->生成一个随机的字符串
const state = {
    goodInfo: {},
    // 获取游客登录信息
    uuid_token:getUUID()
}
const actions = {
    // 获取产品信息的actionw
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车的action或者修改某一个产品的个数
    async addOrUpdateShopCart({commit},{skuId,skuInfo}){
        // 发请求:前端带一些参数给服务器[需要存储这些数据],存储成功了 就没有返回数据
        // 注意:async函数返回的结果一定是promise[要么成功要么失败]
        let result = await reqAddOrUpdateShopCart(skuId,skuInfo)
        if(result.code == 200){
            // 返回成功的标签
            return 'ok'
        }else{
            // 返回失败的标记
            return Promise.reject(new Error ('faile'))
        }
        // if(result.code)
    }

}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }

}
// 简化数据而生
const getters = {
    // 路径导航简化的数组
    categoryView(state) {
        // state.goodInfo初始状态空对象，空对象的categoryView属性值是undefined
        // 当前计算出的 categoryView属性值至少一个空对象，假报错就不会有了
        return state.goodInfo.categoryView || {}
        //  || {}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}