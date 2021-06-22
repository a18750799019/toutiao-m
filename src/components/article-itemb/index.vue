<!--  -->
<template>
  <!-- 无图 -->
  <div class='article-item-0'
       v-if="article.cover.type === 0">
    <div class="news-info ">
      <div class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      <div class="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
  </div>
  <!-- 无图 -->

  <!-- 三图 -->
  <div class='article-item-3'
       v-else-if="article.cover.type === 3">
    <div class="title">{{article.title}}</div>
    <div class="news-image">
      <van-image width="100"
                 height="100"
                 v-for="(img,index) in article.cover.images"
                 :key="index"
                 lazy-load
                 :src="img" />
    </div>
    <div class="label">
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | relativeTime }}</span>
    </div>
  </div>
  <!-- 三图 -->

  <!-- 单图 -->
  <div class='article-item-1'
       v-else>
    <div class="news-info">
      <div class="title">{{article.title}}</div>
      <div class="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div class="news-image">
      <van-image width="100"
                 height="100"
                 :src="article.cover.images[0]" />

    </div>
  </div>
  <!-- 单图 -->

</template>

<script>

export default {
  name: 'Home',
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
<style lang="less" scoped>
.article-item-0 {
  background-color: #ffffff;
  width: 100%;
  padding: 0.24rem 0.20202rem;
  border-bottom: 1px solid #f5f7f9;
  margin: 0 -0.22rem;
  display: flex;
  .news-info {
    .title {
      font-size: 16px;
      color: #3a3a3a;
      border-bottom: 10px black;
    }
    span {
      font-size: 0.24rem;
      margin-right: 0.12rem;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .news-image {
    justify-content: right;
    height: 1.46rem;
    width: 2.563202rem;
    overflow: hidden;
  }
}
.article-item-1 {
  background-color: #ffffff;
  padding: 0.24rem 0.20202rem;
  border-bottom: 1px solid #f5f7f9;
  display: flex;
  .news-info {
    height: 111px;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    .title {
      align-self: start;
    }
    .label {
      align-self: end;
      span {
        font-size: 0.24rem;
        margin-right: 0.12rem;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  .news-image {
    width: 120px;
    height: 80px;
  }
}
.article-item-3 {
  background-color: #ffffff;
  width: 100%;
  padding: 0.24rem 0.20202rem;
  border-bottom: 1px solid #f5f7f9;
  margin: 0 -0.22rem;
  .title {
    font-size: 16px;
    color: #3a3a3a;
    border-bottom: 10px black;
    margin: 10px 5px 15px 20px;
  }
  .label {
    margin: 10px 5px 15px 20px;
    span {
      font-size: 0.24rem;
      margin-right: 0.12rem;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .news-image {
    height: 80px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
}
</style>
