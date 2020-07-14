<template>
  <main class="main">
    <card-detail :card="card" />
    <Comments
      :comments="card.comments"
      @add="addComment"
    />
  </main>
</template>

<script>
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
  beforeCreate () {
    const id = parseInt(this.$route.params.id)

    this.$axios.get('/data/card.json').then((res) => {
      const cards = res.data
      const card = cards.find(card => card.id === id)

      this.card = card
    })
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
