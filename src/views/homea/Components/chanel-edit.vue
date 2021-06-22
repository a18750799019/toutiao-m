<!--  -->
<template>
  <div class='ChannelEdit'>
    <van-cell value="内容"
              size="large">
      <!-- 自带卡槽label是换行显示 设计稿要求同行小字显示 -->
      <div class="title-wrap"
           slot="title">
        <span class="title">我的频道</span>
        <span class="tip">点击进入频道</span>
      </div>
      <van-button type="danger"
                  size="mini"
                  color="#e5615b"
                  plain
                  round
                  @click=" isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :column-num="4">
      <van-grid-item class="channel-item"
                     v-for="(item,index) in userChannels"
                     :key="item.id"
                     @click="onChannelActiveOrDelete(item, index)">
        <span class="text"
              :class="{ active: value === index }">{{ item.name }}</span>
        <van-icon v-show="isEdit && item.name !== '推荐'"
                  class="close-icon"
                  name="close" />
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell value="内容"
              size="large">
      <div class="title-wrap"
           slot="title">
        <span class="title">推荐频道</span>
        <span class="tip">点击添加频道</span>
      </div>
    </van-cell>
    <van-grid :column-num="4">
      <van-grid-item v-for="item in recommendChannels"
                     :key="item.index"
                     :text="item.name"
                     @click="onChannelAdd(item)">
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannel, deleteChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      default: 0
    }
    // 为什么this调用了方法 在数据中声明后就绑定上了
  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    // map将store中数据在页面中显示
    ...mapState(['user']),
    // recommendChannels为一个变量 计算这个变量的值
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userchannel => userchannel.id === channel.id)
      })
    }
  },
  watch: {},
  methods: {
    onChannelActiveOrDelete (channel, index) {
      console.log(channel, index)
      if (this.isEdit && channel.name !== '推荐') {
        // 编辑状态，执行删除操作
        // this.userChannels.splice(index, 1)

        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('input', index)
        this.$emit('close')
      }
    },
    async deleteChannel (channel, index) {
      try {
        if (this.user) {
          // 已登录，删除线上数据
          await deleteChannel(channel.id)
          this.userChannels.splice(index, 1)
        } else {
          // 未登录，删除本地数据
          console.log(index)
          this.userChannels.splice(index, 1)
          setItem('channels', this.userChannels)
        }
        // 如果删除的是当前激活频道前面的频道，则更新激活频道
        if (index <= this.value) {
          this.$emit('input', this.value - 1)
        }
      } catch (err) {
        console.log(err)
        this.$toast('操作失败，请稍后重试')
      }
    },
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    buttonClick () {
      console.log(this)
      this.isEdit = !this.isEdit
    },
    async onChannelAdd (channel) {
      // 已登录，将数据存储到线上
      try {
        if (this.user) {
          await addChannel({
            id: channel.id,
            seq: this.userChannels.length
          })
        } else {
          // 未登录，将数据存储到本地
          console.log(channel)
          setItem('channels', [...this.userChannels, channel])
        }

        // 更新视图
        this.userChannels.push(channel)
      } catch (err) {
        console.log(err)
        this.$toast('添加失败,请稍后重试')
      }
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.title-wrap {
  .title {
    font-size: 16px;
    margin-right: 10px;
  }

  .tip {
    font-size: 8px;
    color: #ccc;
  }
}
.channel-item {
  .text {
    font-size: 14px;
    color: #222;
  }
  .active {
    color: #e5615b;
  }
  //position固定 vant-grid里面自带了relative定位
  .close-icon {
    position: absolute;
    right: -3px;
    top: -4px;
  }
}
</style>
