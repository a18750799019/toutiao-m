<!--  -->
<template>
  <div class=''>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">

    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'comment-lista',
  components: {},
  props: {
    // 查看文章评论：文章ID
    // 查看评论回复：评论ID
    source: {
      type: [String, Number, Object],
      required: true
    },
    value: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: Number
    },
    isComment: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10

    }
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getComments({
        type: this.isComment ? 'c' : 'a', // 查看文章评论：a，查看评论回复：c
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      console.log(data)
      // 2. 将数据放到列表中
      // 这种数据可以直接不用定义么
      const { results, total_count: totalCount } = data.data
      // 为什么要用this.value
      const arr = this.value.slice()
      arr.push(...results)
      this.$emit('input', arr)
      this.$emit('update:total-count', totalCount)

      // 3. 结束 loading
      this.loading = false
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
</style>
