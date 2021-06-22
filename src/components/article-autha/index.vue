<!--  -->
<template>
  <div class=''>
    <!-- 作者信息 -->
    <div class="author-message">
      <div class="author">
        <van-image class="author-profile"
                   round
                   src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <div class="auth-name">{{article.aut_name}}</div>
          <div class="article-pubdate">{{article.pubdate| relativeTime}}</div>
        </div>
      </div>
      <!-- 作者信息 -->
      <van-button class="follow"
                  size="small"
                  round="true"
                  type="primary">关注</van-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'article-autha',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
.author-message {
  display: flex;
  justify-content: space-between;
  .author {
    display: flex;
  }
  .author-profile {
    width: 39.5px;
    height: 39.5px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .auth-name {
    font-size: 15px;
  }
  .article-pubdate {
    font-size: 15px;
  }
  .follow {
    margin-right: 19.5px;
    width: 85px;
    height: 29px;
  }
}
</style>
