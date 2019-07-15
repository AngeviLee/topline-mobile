import request from '@/utils/request'

// 用户登录
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

// 拉黑用户
export const addBlackList = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}
