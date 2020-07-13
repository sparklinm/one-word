<template>
  <main class="main">
    <Icon
      name="pen"
      class="icon-creat"
      @click="goCreatPage"
    />
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
            @click.native="goPage(card.id)"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="未来语"
        name="second"
      />
    </el-tabs>
  </main>
</template>

<script>
import Card from '@/components/card/Card'

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
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          cover: require('@/assets/head.jpg'),
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        },
        {
          nickName: '想不想喝奶茶',
          head: require('../assets/head.jpg'),
          content:
            ' 多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
          commentsNum: 12
        }
      ],
      activeName: 'first'
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
.main
  .cards-container
    margin: 10px;
    column-count: 3;
    column-gap: 15px;
  .wall-card
    margin-bottom 20px
  .icon-creat
    position fixed
    top 100px
    right 100px
    font-size 40px
    color #0a618d
    cursor pointer

</style>
