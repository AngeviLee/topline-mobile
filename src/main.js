import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant,导入图片懒加载
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
// 引入适配所需要的lib-fiexible
import 'amfe-flexible'
// 引入自定义全局样式
import './styles/index.less'
// 引入表单验证插件
// 1.引入语言包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
// 引入dayjs处理时间格式
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'
// dayjs的相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 把插件注册到dayjs中
dayjs.extend(relativeTime)

// 配置中文使用的语言包
dayjs.locale('zh-cn')

Vue.use(VeeValidate, {
  // 配置触发时机
  // 配置改变的时候去触发校验，默认是input
  events: ''
})

// 配置语言
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)
Vue.use(Lazyload)

Vue.config.productionTip = false

// 给Vue原型上添加一个方法
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
