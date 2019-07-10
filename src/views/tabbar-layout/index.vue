<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">首页 </van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="/qu">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
