import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
Vue.config.productionTip = false

new Vue({
  router,   // 把弄好的路由到这里注册
  render: h => h(App),
}).$mount('#app')
