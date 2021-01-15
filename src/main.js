import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts

// import 'lib-flexible'
// import './plugins/qiankun.js'

/**
 * @method : 全局注册方法
 */
import Prototype from './utils/globalPrototype'
Vue.use(Prototype)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
