import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter) // 使用插件

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
export default new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savePosition) {
        // y等于代表滚动条再最上方
        return { x: 0, y: 0 }
    }
})