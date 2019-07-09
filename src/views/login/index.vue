<template>
  <div class="loginwrap">
    <!-- 頂部 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单数据区 -->
    <form>
      <!-- 输入框区域 -->
      <van-cell-group>
        <van-field
          left-icon="contact"
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="15931441062"
        />

        <van-field
          v-model="user.code"
          left-icon="lock"
          type="password"
          label="密码"
          placeholder="请输入密码"
          autocomplete
          required
        />
      </van-cell-group>
      <!-- 按钮区域 -->
      <div class="btn-box">
        <van-button type="info" @click.prevent="handleLogin">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        mobile: '15931441062',
        code: '123456'
      }
    }
  },
  methods: {
    async handleLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
        console.log('登陆失败')
      }
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
