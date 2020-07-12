<template>
  <main class="main">
    <Card
      v-for="(card,index) in cards"
      :key="index"
      :card="card"
      class="wall-card"
      @click.native="goPage(card.id)"
    />
  </main>
</template>

<script>
import Card from '@/components/Card'

export default {
  components: {
    Card
  },
  data () {
    return {
      cards: [
        {
          id: 0,
          nickName: '想不想喝奶茶',
          head: require('@/assets/head.jpg'),
          content: ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          cover: require('@/assets/head.jpg'),
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content: ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content: ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        }
      ]
    }
  },
  computed: {},
  methods: {
    goPage (id) {
      this.$router
        .push({
          path: `/card/${id}`
        })
        .catch((err) => err)
    }
  }
}
</script>

<style lang="stylus">
.wall-card
  margin-right 30px
  margin-bottom 30px
</style>
