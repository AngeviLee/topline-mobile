<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="searchText"
        show-action
        @search="handleSearch(searchText)"
      />
    </form>
    <!-- 搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group v-if="suggestion.length && searchText.length">
      <van-cell v-for="item in suggestion" :key="item" icon="search" @click="handleSearch(item)">
        <!-- 不能展示带有html标签的字符 -->
        <!-- 过滤器： 过滤器只能用在{{}}和v-bind中 -->
        <div slot="title" v-html="highlight(item, searchText)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 联想建议 -->
    <!-- 历史记录 -->
    <van-cell-group v-if="searchHistories.length && !searchText.length">
      <van-cell title="历史记录">
        <van-icon
          v-show="!isDeleteShow"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          @click="isDeleteShow = true"
        />
        <div v-show="isDeleteShow">
          <span style="margin-right: 10px;" @click="searchHistories= []">全部删除</span>
          <span @click="isDeleteShow = false">完成</span>
        </div>
      </van-cell>
      <van-cell v-for="(item, index) in searchHistories" :key="item" :title="item">
        <van-icon
          v-show="isDeleteShow"
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
          @click="searchHistories.splice(index, 1)"
        />
      </van-cell>
      <!-- 历史记录 -->
    </van-cell-group>
  </div>
</template>

<script>
// 引入封装的联想建议框
import { getSuggestion } from '@/api/serach'
// 引入lodash
import { debounce } from 'lodash'

export default {
  name: 'SearchIndex',
  data () {
    return {
      // 搜索框的关键词内容
      searchText: '',
      // 声明一个数组存放联想建议
      suggestion: [],
      // 控制删除的显示状态
      isDeleteShow: true,
      // 存储搜索历史纪录
      searchHistories: JSON.parse(window.localStorage.getItem('search-histories')) || []
    }
  },
  watch: {
    // 监视输入数据的改变，当数据发生变化，发请求获取搜索建议，展示到列表中
    // async searchText (text) {
    // async searchText (text) {
    //   // 去除首尾空格
    //   text = text.trim()
    //   // 非空判断
    //   if (!text.length) {
    //     return
    //   }
    //   // 请求获取建议
    //   try {
    //     const data = await getSuggestion(text)
    //     this.suggestion = data.options
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }
    searchText: debounce(async function (text) {
      // 去除首尾空格
      text = text.trim()
      // 非空判断
      if (!text.length) {
        return
      }
      // 请求获取建议
      try {
        const data = await getSuggestion(text)
        this.suggestion = data.options
      } catch (err) {
        console.log(err)
      }
    }, 500),

    searchHistories () {
      const data = JSON.stringify(this.searchHistories)
      window.localStorage.setItem('search-histories', data)
    }
  },
  methods: {
    highlight (text, keyword) {
      return text
        .toLowerCase()
        .split(keyword)
        .join(`<span style="color: red">${keyword}</span>`)
    },
    handleSearch (queryText) {
      if (!queryText.length) {
        return
      }
      // 记录搜索历史记录（放到顶部）
      this.searchHistories.unshift(queryText)
      // 数组去重
      const data = new Set(this.searchHistories)
      // 将去重的结果重新赋值到数组中
      this.searchHistories = Array.from(data)
      // 跳转到搜索结果页面
      this.$router.push({
        name: 'search-result',
        params: {
          q: queryText
        }
      })
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
