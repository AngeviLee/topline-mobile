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
      <van-cell
        v-for="item in articles"
        :key="item.art_id.toString()"
        :title="item.title"
      />
    </van-list>
    <!-- 文章列表 -->
  </div>
</template>

<script>
// 引进封装搜索的接口
import { getSearch } from '@/api/serach'

export default {
  name: 'SearchResult',
  data () {
    return {
      // 搜索列表
      articles: [],
      // 加载状态
      loading: false,
      // 搜索完毕，到底了
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  computed: {
    q () {
      return this.$route.params.q
    }
  },
  // async created () {
  //   const data = await getSearch({
  //     page: 2,
  //     perPage: 20,
  //     q: this.$route.params.q
  //   })
  //   console.log(data)
  // },

  methods: {
    async onLoad () {
      await this.$sleep(800)
      const data = await getSearch({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      })
      // 如果没有数据了
      if (!data.results.length) {
        // 取消loading
        this.loading = false
        // 设置数据已加载结束
        this.finished = true
        return
      }
      // 如果有数据，将数据push到数组中加载更多
      this.articles.push(...data.results)
      // 更新下一次加载更多的页码
      this.page += 1
      // 本地数据加载完毕，关闭loading（它每次onLoad的时会自动将loading设置为true)
      this.loading = false
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
