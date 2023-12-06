import Vue from 'vue'
import App from './App.vue'
//三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数设置组件名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
import { Button,  MessageBox } from 'element-ui'
// 饿了么UI的两种写法  1.组件注册  2.直接挂在原型上
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 轮播图 全局组件
import Carsousel from '@/components/Carousel'
Vue.component(Carsousel.name, Carsousel)

// 分页器全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)

//引入MockServe.js---------mock数据
import '@/mock/mockServe'

//引入Swiper样式
import 'swiper/css/swiper.css'

import router from '@/router'

//引入仓库
import store from '@/store'
Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
import *as API from '@/api'   // 统一引入



///测试发请求
// import { reqGoodsInfo } from '@/api'
// reqGoodsInfo()

new Vue({
  router,   // 把弄好的路由到这里注册
  store,   //注册仓库    组件身上会多$router,$route的属性
  beforeCreate() {
    // 配置全局事件总线
    Vue.prototype.$bus = this
    // 把所有API都挂在到Vue的原型对象上
    Vue.prototype.$API = API
  },
  render: h => h(App),
}).$mount('#app')
