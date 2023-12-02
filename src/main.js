import Vue from 'vue'
import App from './App.vue'
//三级联动组件注册为全局组件
import TypeNav from '@/components/TypeNav'
//第一个参数设置组件名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

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



///测试发请求
// import { reqGoodsInfo } from '@/api'
// reqGoodsInfo()

new Vue({
  router,   // 把弄好的路由到这里注册
  store,   //注册仓库    组件身上会多$router,$route的属性
  beforeCreate() {
    // 配置全局事件总线
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')