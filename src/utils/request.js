import axios from 'axios'

// axios.create用于创建一个axios实例，该实例和axios的功能是一模一样的
// 说白了，这样就是克隆了一个axios
// 为方便以后访问的时候不用再写长长的地址
const request = axios.create({
  baseURL: 'http://toutiao.course.itcast.cn'
})

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // 如果响应结果对象中有data，则直接返回这个data数据
  // 如果响应结果对象中没有data，则不作任何处理，原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

// 导出request请求
export default request
