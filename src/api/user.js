// 封装用户相关接口请求函数
import request from '@/utils/request'

// 封装导出登录接口
export const login = ({ mobile, code }) => {
  // 指向其他逻辑
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
