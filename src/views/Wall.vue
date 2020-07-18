<template>
  <main class="wall-main">
    <el-tabs
      v-model="activeName"
      class="tabs"
      @tab-click="changePane"
    >
      <el-tab-pane
        label="未来语"
        name="first"
      >
        <div class="cards-container">
          <Card
            v-for="(card, index) in cards"
            :key="index"
            :card="card"
            class="wall-card hover-big "
            @click="goPage(card.id)"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="此刻"
        name="second"
      >
        <div class="article-list">
          <article-item
            v-for="(article, index) in articles"
            :key="index"
            class="wall-article-item"
            :article="article"
            @click="goPage(article.id)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <div
      ref="loading"
      class="loading"
    >
      <i
        v-show="showLoading"
        class="el-icon-loading el-icon-middle"
      />
      <transition name="el-fade-in">
        <span
          v-show="showNoMoreData"
          class="text-gray"
        >无更多数据</span>
      </transition>
    </div>
    <el-collapse-transition>
      <Icon
        v-show="showIconCreat"
        name="pen"
        class="icon-creat el-icon-big"
        @click="goCreatPage"
      />
    </el-collapse-transition>
  </main>
</template>

<script>
import { getCards } from '@/js/data'
import { cutText, infiniteScroll } from '@/js/util'
import Card from '@/components/card/Card'
import ArticleItem from '@/components/article/ArticleItem'

export default {
  components: {
    Card,
    ArticleItem
  },
  data () {
    return {
      activeName: 'first',
      showIconCreat: false,
      showLoading: false,
      showNoMoreData: false,
      someCards: [],
      allCards: []
    }
  },
  computed: {
    cards () {
      return this.someCards.map(card => {
        return {
          id: card.id,
          nickName: card.nickName,
          head: card.head,
          content: cutText(card.content, 100),
          cover: card.imgs[0],
          commentsNum: card.comments && card.comments.length || 0
        }
      })
    },
    articles () {
      return this.someCards.concat()
    }
  },
  async beforeCreate () {
    const cards = await getCards()

    this.allCards = cards
    this.someCards = cards.slice(0, 10)
  },

  mounted () {
    setTimeout(() => {
      this.showIconCreat = true
    }, 700)

    this.infiniteScroll = infiniteScroll({
      callback: () => {
        this.$refs.loading.style.opacity = 1
        this.showLoading = true
        this.loadCards().then(() => {
          this.showLoading = false
          this.$refs.loading.style.opacity = 0
        }).catch(() => {
          this.showNoMoreData = true
          this.showLoading = false
          setTimeout(() => {
            this.showNoMoreData = false
            this.$refs.loading.style.opacity = 0
          }, 1000)
        })

      }
    })
  },
  destroyed () {
    this.infiniteScroll.destory()
  },
  methods: {
    loadCards () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.someCards.length === this.allCards.length) {
            reject()
            return
          }
          this.someCards = this.allCards.slice(0, this.someCards.length + 10)
          resolve()
        }, 2000)
      })
    },
    goPage (id) {
      this.$router
        .push({
          path: `/card/${id}`
        })
        .catch((err) => err)
    },
    goCreatPage () {
      this.$router
        .push({
          path: '/creat'
        })
        .catch((err) => err)
    },
    changePane (vue) {
      this.someCards = this.allCards.slice(0, 10)
      if (vue.name === 'second') {
        this.$nextTick(() => {
          vue.$children.forEach(item => item.contentHeight())
        })
      }

    }
  }
}
</script>

<style lang="stylus">
.wall-main
  position relative
  .cards-container
    margin: 10px;
    column-count: 3;
    column-gap: 15px;
  .wall-card
    margin-bottom 20px
    width 100%
  .icon-creat
    position: absolute;
    top: -0px;
    right: 0;
    color #0a618d
    cursor pointer
    z-index 100
  .loading
    height 10px
    text-align center
    padding 10px
    margin-bottom 30px
    opacity 0
  // .icon-creat-enter-active
  // .icon-creat-leave-active
  //   transition all 0.3s ease
  // .icon-creat-leave-to
  // .icon-creat-enter


</style>
