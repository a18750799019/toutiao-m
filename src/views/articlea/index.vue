<!--  -->
<template>
  <div class='article-container'>
    <!-- 导航栏 -->
    <div class="article-nav">
      <van-nav-bar title="文章详情"
                   left-arrow
                   @click-left="$router.back()" />
    </div>
    <!-- 导航栏 -->

    <!-- 加载中：loading -->
    <loading-pagea v-if="loading" />
    <!-- 加载中：loading -->

    <!-- 加载完成：文章详情 -->
    <template v-else-if="article.title">
      <div class="article-title">
        <h3>{{article.title}}</h3>
      </div>
      <article-autha :article="article" />

      <div class="article-content ">
        <div v-html="article.content"></div>
      </div>
      <van-divider>正文结束</van-divider>
    </template>
    <!-- 加载完成：文章详情 -->

    <comment-lista :source="articleId"></comment-lista>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import LoadingPagea from '@/components/loading-pagea'
import ArticleAutha from '@/components/article-autha'
import CommentLista from './components/comment-lista.vue'
export default {
  name: 'articleA',
  components: {
    LoadingPagea,
    ArticleAutha,
    CommentLista
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    async loadArticle () {
      // 开启转圈圈
      this.loading = true

      try {
        const res = await getArticle(this.articleId)
        this.article = res.data.data
        // 给文章内容中的图片添加点击预览
        setTimeout(() => {
          this.addImagePreview()
        }, 0)
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }

      // 请求结束，关闭转圈圈
      this.loading = false
    }
  },
  created () {
    this.loadArticle()
  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
/deep/.van-nav-bar {
  background-color: #3296fa;
}
.article-container {
  overflow: scroll;
  background: #fff;
}
.article-title {
  margin-left: 15px;
}
.article-content {
  margin-bottom: 65px;
}
</style>
