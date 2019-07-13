<template>
  <van-popup
    position="bottom"
    :style="{ height: '95%' }"
    :value="value"
    @input="$emit('input', $event)"
  >
    <div class="close"></div>
    <div class="channels">
      <!-- 头部 -->
      <div class="head">
        <div>
          <span>我的频道</span>
          <span>点击进入频道</span>
        </div>
        <div>
          <button>编辑</button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 宫格组件 -->
        <van-grid :gutter="10" clickable>
          <van-grid-item
            v-for="(channelItem, index) in channels"
            :key="channelItem.id"
          >
          <!-- 因为在宫格上加不上高亮样式，所以利用span插进宫格组件中 -->
            <span
              slot="text"
              class="text"
              :class="{ active: index === activeIndex }"
            >{{ channelItem.name }}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    channels: {
      type: Array,
      default: () => []
    },
    activeIndex: {
      type: Number,
      default: 0
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
.channels {
  .content {
    .text {
      font-size: 20px;
    }
    .active {
      color: red;
    }
  }
}
</style>
