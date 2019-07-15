<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group v-if="!isReportShow">
      <van-cell icon="setting" title="不感兴趣" @click="handleDislike" />
      <van-cell icon="setting" title="反馈垃圾内容" is-link @click="isReportShow = true" />
      <van-cell icon="setting" title="拉黑作者" @click="handleBlackList" />
    </van-cell-group>

     <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReportShow = false" />
      <van-cell
        icon="setting"
        v-for="item in reportTypes"
        :key="item.value"
        :title="item.label"
        @click="handleReportArticle(item.value)"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 引入封装不喜欢文章的接口和举报文章接口
import { dislikeArticle, reportArticle } from '@/api/article'
// 引入封装的加入黑名单的方法接口
import { addBlackList } from '@/api/user'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentArticel: {
      type: Object
    }
  },
  data () {
    return {
      isReportShow: false,
      // 举报类型
      reportTypes: [
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 },
        { label: '其他问题', value: 0 }
      ]
    }
  },
  methods: {
    // 处理不感兴趣的文章方法
    async handleDislike () {
      // console.log(this.currentArticel)
      try {
        await dislikeArticle(this.currentArticel.art_id)

        // 移除客户端的那个文章
        this.$emit('dislike-success')
      } catch (err) {
        this.$toast('操作失败')
      }
    },
    // 添加黑名单方法
    async handleBlackList () {
      // console.log(this.currentArticel)
      try {
        await addBlackList(this.currentArticel.aut_id)
        // 添加黑名单成功，子组件向外部传
        this.$emit('add-blacklist-success')
      } catch (err) {
        this.$toast('操作失败')
      }
    },
    async handleReportArticle (type) {
      try {
        await reportArticle({
          articleId: this.currentArticel.art_id,
          type
        })
        // 事件不是强制的，我只是给你提供了，用不用说你的事儿
        this.$emit('report-success')
        // 关闭对话框
        this.$emit('input', false)
        // 提示
        this.$toast('举报成功')
      } catch (err) {
        if (err.reponse && err.reponse.status === 409) {
          this.$toast('该文章已被举报过')
        } else {
          this.$toast('操作失败')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
