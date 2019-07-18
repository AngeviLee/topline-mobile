<template>
  <van-popup
    :style="{ height: '95%' }"
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    get-container="body"
    :lazy-render="false"
  >
    <!-- 我的频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}</van-button>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="(Item, index) in userChannels"
          :key="Item.id"
          @click="handleUserChanneClick(Item, index)"
        >
          <span
            class="text"
            :class="{ active: index === activeIndex && !isEdit }"
          >{{ Item.name }}</span>
          <van-icon
            class="close-icon"
            name="close"
            v-show="isEdit && !aliveChannels.includes(Item.name)"
          />
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <van-grid class="channel-content" :gutter="10" clickable>
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          @click="handleAddChannel(item)"
        >
          <div class="info">
            <span class="text">{{ item.name }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
// 引入封装好的所有频道接口
import { getAllChannels, deleteUserChannel, resetUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
export default {
  name: 'HomeChannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userChannels: {
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
      // show: true
      // 用来存储所有的频道列表
      allChannels: [],
      // 编辑状态标志
      isEdit: false,
      // 永远存活的列表
      aliveChannels: ['推荐', 'css']
    }
  },
  computed: {
    // 过滤出不包含用户频道的列表数据
    recommendChannels () {
      // 利用map方法，从用户频道列表中映射一个数组。数组中存储了所有用户频道的id
      const duplicates = this.userChannels.map(item => item.id)
      return this.allChannels.filter(item => !duplicates.includes(item.id))
    },
    // Vuex的辅助方法，用于将state中的数据映射到本地计算属性
    // 说白就是user = this.$store.state.user
    ...mapState(['user'])
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const data = await getAllChannels()
      // console.log(data)
      // 为防止添加后加载冲突
      data.channels.forEach(item => {
        // 用来存储文章的列表
        item.articles = []
        // 控制当前频道的下拉刷新loading状态
        item.drownPullLoading = false
        // 控制当前频道的上拉加载更多的loading状态
        item.upPullLoading = false
        // 控制当前频道数据是否加载完毕
        item.upPullFinished = false
        // 存放下一页的时间戳
        item.timestamp = Date.now()
      })
      this.allChannels = data.channels
    },
    async handleAddChannel (item) {
      // 将点击添加的频道添加到用户频道
      this.userChannels.push(item)

      // 持久化的问题
      // 如果用户已登录，则将数据请求添加到后端
      if (this.user) {
        // 不包含推荐
        const data = this.userChannels.slice(1).map((item, index) => {
          return {
            // 频道id
            id: item.id,
            seq: index + 2
          }
        })
        await resetUserChannel(data)
        return
      }
      // 如果未登录，则将数据持久化到本地存储
      window.localStorage.setItem('channels', JSON.stringify(this.userChannels))
    },

    changeChannel (item, index) {
      // 向父组件提交当前选中的索引
      this.$emit('update:active-index', index)
      this.$emit('input', false)
    },
    async deleteChannel (item, index) {
      // 删除
      this.userChannels.splice(index, 1)

      if (this.user) {
        // 登录，发请求删除
        await deleteUserChannel(item.id)
        return
      }
      window.localStorage.setItem('channels', JSON.stringify(this.userChannels))
    },
    handleUserChanneClick (item, index) {
      if (!this.isEdit) {
      // 非编辑状态：切换频道
        this.changeChannel(item, index)
      } else {
        // 编辑转态：删除频道
        !this.aliveChannels.includes(item.name) && this.deleteChannel(item, index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
    }
    .action {
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
