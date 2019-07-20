<template>
  <!-- <div>搜索结果页面 {{ $route.params.q }}</div> -->
  <div>
    <!-- 导航头部 -->
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      right-text="按钮"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- 导航头部 -->
    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
    <!-- 文章列表 -->
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data () {
    return {
      // 搜索列表
      list: [],
      // 加载状态
      loading: false,
      // 搜索完毕，到底了
      finished: false
    }
  },
  methods: {
    onLoad () {
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
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
.article-list {
  margin-top: 92px;
}
</style>
