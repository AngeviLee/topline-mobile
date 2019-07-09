import Vue from 'vue'
import Vuex from 'vuex'
// 引入封装操作用户信息的模块
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化的时候从本地存储获取数据，防止刷新token
    user: auth.getUser()
  },
  mutations: {
    // 登陆成功，调用mutation更新容器中的user的状态
    setUser (state, data) {
      state.user = data
      // 将数据放到本地存储
      auth.saveUser(state.user)
    }
  },
  actions: {

  }
})
