import axios from 'axios'
// 引入vuex中的state状态
import store from '@/store'
// 引入处理超出整数范围的大数字的第三方包
import JSONbig from 'json-bigint'
// 引入路由文件
import router from '@/router'

// axios.create用于创建一个axios实例，该实例和axios的功能是一模一样的
// 说白了，这样就是克隆了一个axios
// 为方便以后访问的时候不用再写长长的地址
const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn'
  // 线上地址
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 处理超出整数范围的大数字bigint
request.defaults.transformResponse = [function (data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 如果已登录，则为请求接口统一添加用户token
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // console.log(111)
  // 如果响应结果对象中有data，则直接返回这个data数据
  // 如果响应结果对象中没有data，则不作任何处理，原样返回这个数据
  return response.data.data || response.data
}, async error => {
  if (error.response.status === 401) {
    // 看一下有没有user（有user就有refresh_token)
    const user = store.state.user
    // 如果连user都没有，则直接跳转登录页去登陆
    if (!user) {
      router.push({
        name: 'login'
      })
      return
    }
    // 如果有user,我们请求接口使用refresh_token获取新的访问token
    try {
      // 注意： 请求获取刷新token不要使用request
      // 因为刷新token有他自己的处理流程
      // 如果你使用request的话，需要做更多的判断处理，会导致你分不清请求的流程了
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 拿到新的登录令牌了
      // 更新用户token
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })
      // 把本次因为token过期的请求继续发出去
      // 非刷新token的请求,使用request走我们的那个正常的请求拦截相关流程
      return request(error.config)
    } catch (refreshErr) {
      // 刷新token都请求失败,甭想了，直接去登录页
      router.push({
        name: 'login'
      })
    }
  }
  return Promise.reject(error)
})

// 导出request请求
export default request
