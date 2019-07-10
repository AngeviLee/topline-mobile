import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入适配所需要的lib-fiexible
import 'amfe-flexible'
// 引入自定义全局样式
import './styles/index.less'
// 引入表单验证插件
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
