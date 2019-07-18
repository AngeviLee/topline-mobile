<template>
  <div>
    <!-- 搜索框 -->
    <van-search placeholder="请输入搜索关键词" v-model="searchText" />
    <!-- 搜索框 -->
    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell
        v-for="item in suggestion"
        :key="item"
        :title="item"
        icon="search"
      />
    </van-cell-group>
    <!-- 联想建议 -->

    <!-- 历史记录 -->
    <!-- 历史记录 -->
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
      suggestion: []
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
  components: {}
}
</script>

<style lang='less' scoped>
</style>
