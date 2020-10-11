<template>
  <main class="wall-main">
    <a-tabs
      v-model="activeName"
      class="tabs"
      @tab-click="changePane"
    >
      <a-tab-pane
        key="card"
        tab="未来语"
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
      </a-tab-pane>
      <a-tab-pane
        key="article"
        tab="此刻"
      >
        <div class="article-list">
          <article-item
            v-for="(article, index) in articles"
            :ref="el => { if (el) articleEls[index] = el }"
            :key="index"
            class="wall-article-item"
            :article="article"
            @click="goPage(article.id)"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
    <div
      ref="elLoading"
      class="loading"
    >
      <LoadingOutlined v-show="showLoading" />
      <transition name="el-fade-in">
        <span
          v-show="showNoMoreData"
          class="text-gray"
        >无更多数据</span>
      </transition>
    </div>
    <Icon
      name="pen"
      class="icon-creat"
      style="font-size: 36px"
      @click="goCreatPage"
    />
  </main>
</template>

<script>
import Card from '@/components/card/Card'
import ArticleItem from '@/components/article/ArticleItem'
import { getCards } from '@/api/data'
import { cutText, infiniteScroll } from '@/js/util'
import {
  ref, reactive, onUnmounted, computed, nextTick
} from 'vue'
import { useRouter } from 'vue-router'


async function cardsPiece () {
  const allCards = reactive(await getCards())
  let someCards = allCards.slice(0, 10)

  const loadCards = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (someCards.length === allCards.length) {
          reject()
          return
        }
        someCards = allCards.slice(0, someCards.length + 10)
        resolve()
      }, 2000)
    })
  }

  const initCards = function () {
    someCards = allCards.slice(0, 10)
  }

  const cards = computed(() => {
    return someCards.map(card => ({
      id: card.id,
      nickName: card.nickName,
      head: card.head,
      content: cutText(card.content, 100),
      cover: card.imgs[0],
      commentsNum: (card.comments && card.comments.length) || 0
    }))
  })

  return {
    allCards,
    someCards,
    loadCards,
    cards,
    initCards
  }
}


async function articlesPiece () {
  const allArticles = reactive(await getCards())
  let someArticles = allArticles.slice(0, 10)

  const loadArticles = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (someArticles.length === allArticles.length) {
          reject()
          return
        }
        someArticles = allArticles.slice(0, someArticles.length + 10)
        resolve()
      }, 2000)
    })
  }

  const initArticles = function () {
    someArticles = allArticles.slice(0, 10)
  }

  return {
    allArticles,
    loadArticles,
    articles: someArticles,
    initArticles
  }
}


function loadOnSrcoll (loadCards, loadArticles) {
  let ins = null
  const elLoading = ref(null)
  const showLoading = ref(false)
  const showNoMoreData = ref(false)
  const type = ref('card')

  const loadData = computed(() => {
    return type.value === 'card' ? loadCards : loadArticles
  })

  ins = infiniteScroll({
    callback: () => {
      elLoading.value.style.opacity = 1
      showLoading.value = true
      loadData.value()
        .then(() => {
          showLoading.value = false
          elLoading.value.style.opacity = 0
        })
        .catch(() => {
          showNoMoreData.value = true
          showLoading.value = false
          setTimeout(() => {
            showNoMoreData.value = false
            elLoading.value.style.opacity = 0
          }, 1000)
        })
    }
  })

  onUnmounted(() => {
    ins.destory()
  })

  return {
    ins,
    type,
    elLoading,
    showLoading,
    showNoMoreData
  }
}

export default {
  components: {
    Card,
    ArticleItem
  },
  async setup () {
    const activeName = ref('first')
    const router = useRouter()
    const articleEls = reactive([])
    const { cards, loadCards, initCards } = await cardsPiece()
    const { articles, loadArticles, initArticles } = await articlesPiece()
    const { type, elLoading, showLoading, showNoMoreData } = loadOnSrcoll(loadCards, loadArticles)

    function goPage (id) {
      router
        .push({
          path: `/card/${id}`
        })
        .catch(err => err)
    }
    function goCreatPage () {
      router
        .push({
          path: '/creat'
        })
        .catch(err => err)
    }
    function changePane (name) {
      type.value = name
      if (name === 'card') {
        initCards()
      } else if (name === 'article') {
        initArticles()
        nextTick(() => {
          articleEls.forEach(item => {
            item.contentHeight()
          })
        })
      }
    }

    return {
      activeName,
      elLoading,
      articleEls,
      showLoading,
      showNoMoreData,
      cards,
      articles,
      loadCards,
      goPage,
      goCreatPage,
      changePane
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
