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
      <!-- 历史记录 -->
      <van-cell title="历史记录">
        <van-icon
          v-show="!isDeleteShow"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          @click="isDeleteShow = true"
        />
        <div>
          <span style="margin-right: 10px;">全部删除</span>
          <span @click="isDeleteShow = false">完成</span>
        </div>
      </van-cell>
      <van-cell title="hello">
        <van-icon
          v-show="isDeleteShow"
          slot="right-icon"
          name="close"
          style="line-height: inherit;"
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
      isDeleteShow: false
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
    }, 500)
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
