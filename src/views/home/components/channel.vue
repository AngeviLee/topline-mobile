<template>
  <van-popup
    position="bottom"
    :style="{ height: '95%' }"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: true
    }
  },
  components: {}
}
</script>

<style lang='less' scoped>
</style>
