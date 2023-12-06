import {reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from '@/api/index'
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
    },
    // 删除某个购物车的产出
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        // 不需要三连环  需要通知用户删除成功
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
       let result = await reqUpdateCheckedByid(skuId,isChecked)
       if (result.code === 200){
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
    },
    // 删除全部选中的产品
    deleteAllCheckedCart({dispatch,getters}){
        // context:小仓库 commit[提交mutation修改state]
        // 货物购物车中所有的产品
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
          let promise  = item.isChecked ==1 ? dispatch('deleteCartListBySkuId',item.skuId):''
            PromiseAll.push(promise)
        });
        // 如果有一个失败,返回即为失败结果
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        // console.log(state);
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
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