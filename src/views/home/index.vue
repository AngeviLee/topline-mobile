<template>
  <div class="home">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="activeChannelIndex" class="channel-tabs">
      <van-tab title="标签 1">
        <!-- 下拉列表 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <!-- list列表 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'homeIndex',
  data () {
    return {
      activeChannelIndex: 0,
      list: [],
      loading: false,
      finished: false,
      // 下拉绑定状态
      isLoading: false
    }
  },
  methods: {
    onLoad () {
      console.log('onload')
      // 异步更新数据
      setTimeout(() => {
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
