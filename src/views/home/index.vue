<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab v-for="channelItem in channels" :key="channelItem.id" :title="channelItem.name">
        <!-- 下拉列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- list列表 -->
          <van-list
            v-model="channelItem.upPullLoading"
            :finished="channelItem.upPullFinished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="articleItem in channelItem.articles"
              :key="articleItem.art_id"
              :title="articleItem.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入封装的频道列表的js
import { getUserChannels } from '@/api/channel.js'
// 引入封装的文章接口文档列表
import { getArticles } from '@/api/article'

export default {
  name: 'homeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      // 下拉绑定状态
      isLoading: false,
      // 频道列表
      channels: []
    }
  },
  computed: {
    // 当前激活的频道
    // 因为频道列表是一个数组，为获得当前激活的频道的ID
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      // console.log(123)
      // 获取用户信息
      const { user } = this.$store.state
      // 定义一个频道列表
      let channels = []
      // 已登录,自我理解，如果已登录，发送请求时，或携带token令牌，
      // 所以获取的频道列表不一样
      if (user) {
        const data = await getUserChannels()
        channels = data.channels
      } else {
        // 未登录
        // 如果有本地存储数据则使用本地存储中的频道列表
        const localChannels = JSON.parse(
          window.localStorage.getItem('channels')
        )
        if (localChannels) {
          channels = localChannels
        } else {
          // 如果没有本地存储频道数据则请求获取默认推荐频道列表
          const data = await getUserChannels()
          channels = data.channels
        }
      }
      // 修改channels,将这个数据结构修改为满足我们使用的需求
      channels.forEach(item => {
        // 用来存储文章的列表
        item.articles = []
        // 控制当前频道的下拉刷新loading状态
        item.drownPullLoading = false
        // 控制当前频道的上啦加载更多的loading状态
        item.upPullLoading = false
        // 控制当前频道数据是否加载完毕
        item.upPullFinished = false
        // 存放下一页的时间戳
        item.timestamp = Date.now()
      })
      // 将自定义的频道列表赋值给data中的频道列表
      this.channels = channels
    },
    // 上拉加载更多数据
    async onLoad () {
      console.log('onload')

      // 缓冲加载
      await this.$sleep(800)

      let data = []
      data = await this.loadArticles()

      // 如果没有pre_timestamp,且数数组是空的，则意味着没有数据了
      if (!data.pre_timestamp && !data.results.length) {
        // 设置该频道数据已记载完毕，组件自动给出提示，并且不再onLoad
        this.activeChannel.upPullFinished = true
        // 取消loading
        this.activeChannel.upPullLoading = false
        // 代码不往后执行了
        return
      }
      // console.log(data)
      // pre_timestamp 下一页的页码
      // results 文章列表
      // 解决初始化的时候没有最新推荐数据的问题（没有最新数据，那就加载上一次推荐数据）
      // 加载的是上一页数据（自我理解）
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp

        // 加载下一页数据
        data = await this.loadArticles()
      }

      // 数据加载好以后，将pre_timestamp更新到当前频道中，用于加载下下页数据
      this.activeChannel.timestamp = data.pre_timestamp
      // 将文章数据更新到频道中（注意：是push追加，不是覆盖）
      this.activeChannel.articles.push(...data.results)

      // 数据加载完毕，取消上拉loading
      this.activeChannel.upPullLoading = false
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    async loadArticles () {
      const { id: channelId, timestamp } = this.activeChannel
      const data = await getArticles({
        // 当前激活频道ID
        channelId,
        // 当前频道下一页数据的时间戳
        timestamp,
        // 是否包含置顶数据
        withTop: 1
      })
      return data
    }
  }
}
</script>

<style lang='less' scoped>
// 设备里看到的是50px,但我们需要100px;
// 为看到下面的没有更多了
.channel-tabs {
  margin-bottom: 100px;
}
// 因为有scoped作用域，我们加不上类名，两种方案：
// 1.去掉scoped
// 2.用深度作用域 /deep/   vue官方提供的
// 固定list列表
.channel-tabs /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
}
// 为显示全列表对应的tabs内容
.channel-tabs /deep/ .van-tabs__content {
  margin-top: 100px;
}
</style>
