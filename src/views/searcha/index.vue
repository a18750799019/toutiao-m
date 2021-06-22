<!--  -->
<template>
  <div class='SearchA'>
    <form action="/">
      <!--  focus在重新激活输入框时不显示搜索结果-->
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  @input="onInput"
                  @search="onSearch"
                  @focus="isSearchResultsShow = false"
                  @cancel="$router.back()" />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isSearchResultsShow"
                   :q="searchText"></search-result>
    <!-- 搜索结果 -->

    <!-- 提示 -->
    <!-- 子组件传递到父组件上，调用同同一个search方法 -->
    <search-tip v-else-if="searchText"
                :q="searchText"
                @search="onSearch"></search-tip>
    <!-- 提示 -->

    <!-- 历史记录 -->
    <search-history v-else
                    :q="searchText"
                    @search="onSearch"></search-history>
    <!-- 历史记录 -->

  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
import SearchTip from './components/searchTip.vue'
import SearchResult from '../search/components/search-result.vue'
import SearchHistory from './components/searchHistory.vue'
export default {
  name: 'SearchA',
  components: { SearchTip, SearchResult, SearchHistory },
  props: {},
  data () {
    return {
      searchText: '',
      suggestions: [],
      searchResults: [],
      isSearchResultsShow: false,
      isHistorysShow: true,
      isSuggestionsShow: false,
      page: '',
      perPage: '',
      searchHistories: getItem('search-histories') || []
    }
  },
  computed: {},
  watch: {},
  methods: {
    async onInput (searchText) {
      if (searchText === '') {
        this.isSuggestionsShow = false
      } else {
        this.isHistorysShow = false
        this.isSuggestionsShow = true
      }
    },
    async onSearch (searchText) {
      // 上面写法更好是可以删除旧搜索，保证新搜索在最上面  要不要定义一个变量 还是直接this.searchHistories
      // 以及是否将setItem写在watch
      console.log('onSearch', searchText)
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1 & searchText !== '') {
        this.searchHistories.splice(index, 1)
      }
      // unshift中如果是this.searchText在进行历史记录搜索时会加入空对象
      this.searchHistories.unshift(searchText)
      setItem('search-histories', this.searchHistories)
      // if (this.searchHistories.every(item => item !== searchText)) {
      //   this.searchHistories.push(searchText)
      //   setItem('search-histories', this.searchHistories)
      // }

      this.searchText = searchText
      this.isSuggestionsShow = false
      this.isHistorysShow = false
      this.isSearchResultsShow = true
    },
    onCancel () {
      console.log('onCancel')
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
