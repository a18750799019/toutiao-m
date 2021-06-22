<!--  -->
<template>
  <div class='home page-container'>
    <van-tabs class="channel-tabs"
              v-model="active">
      <van-tab class="channel-tab"
               v-for="item in channels"
               :key="item.index"
               :title="item.name">

        <!-- 文章列表 -->
        <article-list :channel="item" />
        <!-- /文章列表 -->
      </van-tab>

      <div slot="nav-right"
           class="van-tab"
           style="flex: 0 0 8%;"></div>
      <!-- 任何东西都可以做slot div icon -->
      <van-icon slot="nav-right"
                class="wap-nav"
                name="wap-nav"
                @click="isChannelEditShow = true" />
    </van-tabs>
    <!-- 样式绑定设置高度 -->
    <van-popup v-model="isChannelEditShow"
               :style="{height:'100%'}"
               position="bottom"
               closeable>
      <van-nav-bar title="编辑频道" />
      <!-- 父组件向子组件传值 父组件中设置 语法为 :子组件变量名称=父组件变量名称 子组件props   -->
      <chanel-edit :user-channels="channels"
                   v-model="active"></chanel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { getItem } from '@/utils/storage'
import ChanelEdit from './Components/chanel-edit.vue'
import ArticleList from './Components/article-list.vue'

export default {
  name: 'Home',
  components: {
    ChanelEdit,
    ArticleList

  },
  data () {
    return {
      // active不设置0 刷新后汉堡按钮会出现和tab重叠的情况
      active: 0,
      isChannelEditShow: false,
      channels: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadUserChannels () {
      let channels = []
      if (this.user) {
        // 已登录，请求获取用户频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录
        const localChannels = getItem('channels')
        if (localChannels) {
          // 使用本地存储的频道列表
          channels = localChannels
        } else {
          // 没有就使用默认推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    }
  },
  created () {
    this.loadUserChannels()
  },
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.home {
  .wap-nav {
    //父容器position选择relative会影响子容器的position属性
    //在有滚动条的情况下，fixed定位不会随滚动条移动而移动，而absolute则会随滚动条移动
    //在苹果6下 审查元素高度是44px 设置行高 不设置的话不居中
    //在PS中双击矩形4的图层缩览图 弹出拾色器 显示背景色是白色  即用白色覆盖了选项tab显示的文字
    //双击图层4的空白位置 弹出图层样式 看到透明度为.9
    //width占据更大的位置 从图纸上测量 CTRL+点击缩略图
    background-color: #fff;
    font-size: 26px;
    line-height: 43px;
    position: fixed;
    right: 0;
    opacity: 0.9;
    width: 33px;
  }
  /deep/.van-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .van-tabs__line {
      width: 0.4rem !important ;
      background-color: #3296fa;
    }
  }
}
</style>
