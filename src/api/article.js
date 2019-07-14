// 封装文章相关接口请求函数
import request from '@/utils/request'

export const getArticles = ({
  // 频道
  channelId,
  // 时间戳
  timestamp,
  // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
  withTop
}) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}
// 封装不感兴趣的文章接口
export const dislikeArticle = articlesId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articlesId
    }
  })
}
