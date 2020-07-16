<template>
  <main class="wall-main">
    <el-tabs
      v-model="activeName"
      class="tabs"
    >
      <el-tab-pane
        label="小感悟"
        name="first"
      >
        <div class="cards-container">
          <Card
            v-for="(card, index) in cards"
            :key="index"
            :card="card"
            class="wall-card"
            @click="goPage(card.id)"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="未来语"
        name="second"
      />
    </el-tabs>
    <el-collapse-transition>
      <Icon
        v-show="showIconCreat"
        name="pen"
        class="icon-creat"
        @click="goCreatPage"
      />
    </el-collapse-transition>
  </main>
</template>

<script>
import { getCards } from '@/js/data'
import { cutText } from '@/js/util'
import Card from '@/components/card/Card'

export default {
  components: {
    Card
  },
  data () {
    return {
      cards: [],
      activeName: 'first',
      showIconCreat: false
    }
  },
  computed: {},
  async beforeCreate () {
    this.cards = (await getCards()).map(card => {
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

  mounted () {
    setTimeout(() => {
      this.showIconCreat = true
    }, 700)
  },

  methods: {
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
    top: -20px;
    right: 0;
    font-size 40px
    color #0a618d
    cursor pointer
    z-index 100
  // .icon-creat-enter-active
  // .icon-creat-leave-active
  //   transition all 0.3s ease
  // .icon-creat-leave-to
  // .icon-creat-enter


</style>
