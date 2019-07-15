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
// 举报文章
export const reportArticle = ({
  // 举报文章的id
  articleId,
  // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
  type,
  // 其他问题 的附加说明
  remark = ''
}) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type,
      remark
    }
  })
}
