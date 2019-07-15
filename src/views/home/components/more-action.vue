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
      <van-cell icon="setting" title="拉黑作者"  />
      <van-cell icon="setting" title="拉黑作者"  />
      <van-cell icon="setting" title="拉黑作者"  />
      <van-cell icon="setting" title="拉黑作者"  />
      <van-cell icon="setting" title="拉黑作者"  />
    </van-cell-group>
  </van-dialog>
</template>

<script>
// 引入封装不喜欢文章的接口
import { dislikeArticle } from '@/api/article'
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
      isReportShow: false
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
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
