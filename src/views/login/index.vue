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
          v-validate="'required'"
          name="mobile"
          :error-message="errors.first('mobile')"
          v-model="user.mobile"
          required
          clearable
          label="手机号"
          placeholder="15931441062"
        />

        <van-field
          v-model="user.code"
          v-validate="'required'"
          name="code"
          :error-message="errors.first('code')"
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
        <van-button type="info" @click.prevent="handleLogin" :loading="loginLoading">登录</van-button>
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
      },
      loginLoading: false // 控制登录请求的 loading 状态
    }
  },
  created () {
    this.configCustomMessages()
  },
  methods: {
    async handleLogin () {
      this.loginLoading = true
      try {
        const valid = await this.$validator.validate()
        // this.$validator.validate().then(async valid => {
        // 如果验证失败，怎什么都不做
        if (!valid) {
          this.loginLoading = false
          return
        }
        // 表单验证通过，提交表单
        const res = await login(this.user)
        // 通过提交mutation更新Vuex的状态
        this.$store.commit('setUser', res)
        // 表单通过验证，先粗暴的跳到来的页面
        this.$router.push({
          name: 'home'
        })
        // })
      } catch (err) {
        console.log(err)
        // console.log('登陆失败')
        this.$toast.fail('登陆失败，用户名和密码错误!')
      }
      this.loginLoading = false
    },
    configCustomMessages () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空'
          },
          code: {
            required: () => '密码不能为空'
          }
        }
      }
      // 只配置到当前作用域
      this.$validator.localize('zh_CN', dict)
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
