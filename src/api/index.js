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

// 删除购物车的接口  /api/cart/deleteCart/{skuId}   请求方式 DELETE
export const reqDeleteCartById = (skuId) =>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 修改商品选中的接口 /api/cart/checkCart/{skuID}/{isChecked}  GET请求
export const  reqUpdateCheckedByid = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'},)

// 获取验证码接口   /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户的接口 /api/user/passport/register post请求 参数手机号 验证码
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})


// 登录接口 /api/user/passport/login  post请求  参数 post phone password
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

// 获取用户信息【需要带着用户的token向服务器要用户信息】 token通过请求带过去
// http://182.92.128.115/api/user/passport/auth/getUserInfo get请求
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})


// 退出登录的接口  /api/user/passport/logout  get请求 无参数
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:"get"})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get请求
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})


// /api/order/auth/trade  获取商品清单 get
export const reqOrderInof = ()=>requests({url:'/order/auth/trade',method:'get'})


// 提交订单的时候 发送请求 /api/order/auth/submitOrder?tradeNo={tradeNo} post 带参请求（query传参）
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息  /api/payment/weixin/createNative/{orderId}   get 请求
export const reqPayInfo = (orderId) =>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取支付订单的状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//   获取个人中心   /api/order/auth/{page}/{limit}    get 
export const reqMyOrderList = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`,method:'get'})


