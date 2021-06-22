<!--  -->
<template>
  <div class=''>
    <van-cell title="历史记录">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template v-if="isOnDelete">
        <span @click="deleteAllHistory">全部删除</span>
        <span @click="isOnDelete=false">完成</span>
      </template>
      <van-icon v-else
                name="delete"
                @click="isOnDelete=true"></van-icon>
    </van-cell>

    <van-cell-group>
      <!-- 点击删除按钮进行删除 其他位置进入搜索  能否用修饰符 -->
      <van-cell v-for="(searchHistory,index) in searchHistories"
                :key="index"
                @click="onHistoryClick(searchHistory,index)">
        <div slot="title">{{searchHistory}}</div>
        <van-icon v-if="isOnDelete"
                  name="close"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'searchHistory',
  components: {},
  props: {
  },
  data () {
    return {
      // 定义变量时也可以直接调用方法  {{searchHistories}}会错误
      searchHistories: getItem('search-histories') || [], // 搜索历史记录
      isOnDelete: false,
      a: ''
    }
  },
  computed: {},
  watch: {

  },
  methods: {
    onDelete () {
    },
    onHistoryClick (searchHistory, index) {
      if (this.isOnDelete === false) {
        this.$emit('search', searchHistory)
      } else {
        // 用removeItem是否可以
        const index = this.searchHistories.indexOf(searchHistory)
        this.searchHistories.splice(index, 1)
        setItem('search-histories', this.searchHistories)
      }
    },
    deleteAllHistory () {
      // 单个删除后页面会自动更新 全部删除后得手动刷新
      setItem('search-histories', [])
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
span {
  margin: 3px;
}
</style>
