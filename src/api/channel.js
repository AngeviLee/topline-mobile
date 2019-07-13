// 封装频道相关接口请求函数
import request from '@/utils/request'

// 获取首页频道列表
// 已登录（携带token): 用户频道列表
// 未登录：推荐频道列表，访问的都是一个接口
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
// 删除用户指定频道
export const deleteUserChannel = channeId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channeId}`
  })
}
// 添加用户频道
// channels:[ { id: 频道id, seq:顺序序号 }]
// 数据的顺序都从2开始
// 因为 推荐是用户默认频道，推荐从1开始
// [{id:1, seq: 1}, {id: 频道id, seq:序号}]
export const resetUserChannel = channels => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
