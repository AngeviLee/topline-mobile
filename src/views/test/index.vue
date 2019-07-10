<template>
  <div>
    <p>test page</p>
    <input v-validate="'required'" name="username" type="text">
    <span>{{ errors.first('username') }}</span>

    <van-cell-group>
      <van-field
        v-model="username"
        placeholder="请输入用户名"
        name="username"
        type="text"
        v-validate="'required'"
        :error-message="errors.first('username')"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'TestIndex',
  data () {
    return {
      username: ''
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
