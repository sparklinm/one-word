<template>
  <div class="card-detail">
    <div class="card-detail-head">
      <el-avatar
        :src="card.head"
        class="user-head"
      />
      <span class="nickname">{{ card.nickName }}</span>
    </div>
    <div class="card-detail-body">
      <div
        class="content"
        v-html="card.content"
      />
    </div>
    <div class="card-detail-foot">
      {{ card.date }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({
        id: 0,
        nickName: '想不想喝奶茶',
        head: require('@/assets/head.jpg'),
        content: '多希望我只是个孩子，给颗糖就笑，摔倒了就哭。不用伪装到面目全非，不用压抑自己的心情，笑着说无所谓，却往往笑得越开心，心里越疼。',
        date: '19:23'
      })
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">
.card-detail
  .card-detail-head
    margin-bottom 30px
  .nickname
    vertical-align top
    margin-left 20px
  .card-detail-body
    margin-bottom 20px

</style>
