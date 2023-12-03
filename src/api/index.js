//当前模块：API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动接口   /api/product/getBaseCategoryList   get  无参

// export const reqCategoryList = () => {
//     //发请求
//     //axios发请求 返回对象是promise对象
//     return requests({ url: '/product/getBaseCategoryList', method: 'get' })
// }
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')
//切记：当前函数执行需要把服务器返回结果返回


//获取banner（Hone首页轮播图接口）
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取搜素模块数据 地址/api/list  方式post  请求需要带参数
// 当前接口，给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: 'post', data: params })


// 获取详情信息的接口   /api/item/{ skuId } get请求
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车列表的接口    /api/cart/cartList
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})


