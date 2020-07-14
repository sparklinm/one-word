<template>
  <main class="main">
    <card-detail :card="card" />
    <Comments
      :comments="card.comments||[]"
      @add="addComment"
    />
  </main>
</template>

<script>
import { getCards } from '@/js/data'
import CardDetail from '@/components/card/CardDetail'
import Comments from '@/components/comment/Comments'

export default {
  components: {
    CardDetail,
    Comments
  },
  data () {
    return {
      card: {}
    }
  },
  computed: {},
  async beforeCreate () {
    const id = parseInt(this.$route.params.id)
    const cards = await getCards()
    const card = cards.find(card => card.id === id)

    this.card = card
  },
  methods: {
    addComment (comment) {
      this.card.comments.push(comment)
      this.$nextTick(() => {
        document.documentElement.scrollTop = 10000
      })
    }
  }
}
</script>

<style lang="stylus">

</style>
