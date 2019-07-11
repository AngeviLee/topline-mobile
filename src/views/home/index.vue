<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab v-for="channelItem in channels" :key="channelItem.id" :title="channelItem.name">
        <!-- 下拉列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- list列表 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入封装的频道列表的js
import { getUserChannels } from '@/api/channel.js'
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
      })
      // 将自定义的频道列表赋值给data中的频道列表
      this.channels = channels
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        console.log('onLoad')
        // 异步更新数据
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
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
