<template>
  <main class="card-detail-main">
    <card-detail :card="card" />
    <Comments
      :comments="card.comments || []"
      @add="addComment"
    />
  </main>
</template>

<script>
import { getCards, putCards } from '@/api/data'
import CardDetail from '@/components/card/CardDetail'
import Comments from '@/components/comment/Comments'

export default {
  components: {
    CardDetail,
    Comments
  },
  props: {
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      card: {}
    }
  },
  computed: {},
  async created () {
    const id = parseInt(this.id)
    const cards = await getCards()
    const card = cards.find((card) => card.id === id)

    console.log(cards)

    this.card = card
  },
  beforeUnmount () {

    // 临时的处理
    if (this.id > 100) {
      putCards(this.card)
    }
  },
  methods: {
    addComment (comment) {
      this.card.comments.push(comment)
      this.$message({
        message: '评论成功',
        type: 'success',
        customClass: 'el-message-bottom',
        duration: 2000
      })
      this.$nextTick(() => {
        document.documentElement.scrollTop = 10000
      })
    }
  }
}
</script>

<style lang="stylus">
.card-detail-main
  width 50%
  margin -50px auto 0
</style>
