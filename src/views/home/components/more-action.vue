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
      <van-cell icon="setting" title="拉黑作者"  />
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
// import { dislikeArticle } from '@/api/article'
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
    handleDislike () {
      // dislikeArticle()
      console.log(this.currentArticel)
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
