<!--  -->
<template>
  <div class=''>
    <van-cell-group>
      <van-cell v-for="(suggestion,index) in suggestions"
                :key="index"
                @click="$emit('search', suggestion)">
        <van-icon class="search-icon"
                  slot="icon"
                  name="search" />
        <div slot="title"
             v-html="highlight(suggestion)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestions } from '@/api/search'
export default {
  name: 'Home',
  components: {},
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []

    }
  },
  computed: {},
  watch: {
    q: {
      handler: debounce(async function () {
        const q = this.q
        if (!q) {
          return
        }
        const { data } = await getSuggestions(q)
        this.suggestions = data.data.options
      }, 200),
      immediate: true
    }
  },
  methods: {
    highlight (str) {
      return str.toLowerCase().replace(
        this.q.toLowerCase(),
        `<span style="color: red;">${this.q}</span>`
      )
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.search-icon {
  margin: 5px;
}
</style>
