import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter) // 使用插件

// 引入store
import store from "@/store";

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写originPush原型对象上的push，先保存一份
//第一参数：告诉原来的push方法，你往哪里来，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call || apply 区别：相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// console.log(originPush);
// VueRouter.prototype.push = function (location, resolve, reject) {
//     // 此函数上下文(this指向)为VueRouter的一个实例
//     if (resolve && reject) {    //如果我们自己指定了成功/失败的回调，则自己传入
//         originPush.call(this, location, resolve, reject)
//         //若此时直接使用originPush()，相当于调用了函数originPush()，则函数内的this指向window（内部代码将无法执行）。故应用call或apply方法修改this指向
//     } else {    //如果我们没有指定成功/失败的回调，则自动帮我们生成，防止报错
//         originPush.call(this, location, () => { }, () => { })
//     }
// }
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


//配置路由
let router =  new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        // y等于代表滚动条再最上方
        return { x: 0, y: 0 }
    }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async(to,from,next)=>{
    // to:可以获取到跳转到想要跳转到那个路由的信息
    // from:可以获取到那个路由来的信息
    // next:放行   next('/path')放行到指定路由
    // console.log(store.state.user.token);
    let token = store.state.user.token

    // 用户信息
    let name = store.state.user.userInfo.name
    // console.log(store.state.user);


    if(token){
        // 用户已经登录  不能回到登录页面
        if(to.path == '/login'){
            next('/home')
        }else{
            if(name){
            // 跳转的时候如果有用户信息
                next()
            }else{
                try {
                // 没有用户信息
                // 先派发action
               await store.dispatch('getUserInfo')
            //    等待成功  放行
                next()
                } catch (error) {
                    // token失效了 获取不了用户信息  从新登录
                    // 1.清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
    next()
    }

})

export default router