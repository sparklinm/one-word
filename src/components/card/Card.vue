<template>
  <div
    class="card"
  >
    <div class="card-head">
      <a-avatar
        :src="card.head"
        class="user-head"
      />
      <span class="nickname">{{ card.nickName }}</span>
    </div>
    <div class="card-body">
      <pre class="card-content">{{ card.content }}</pre>
      <div
        v-if="card.cover"
      >
        <img
          :src="card.cover"
          class="card-cover"
          alt
        >
      </div>
    </div>
    <div class="card-footer">
      <a-badge
        :count="card.commentsNum"
        :show-zero="true"
        class="ant-badge-count-info"
      >
        <MessageOutlined style="font-size:24px" />
      </a-badge>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
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
.card
  display inline-block
  border-radius 30px
  box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  border 1px solid #d7dae2
  background white
  padding 20px
  width 300px
  box-sizing border-box
  .card-head
    display flex
    justify-content space-between
  .user-head
    margin-right 15px
    flex-shrink 0
  .nickname
    vertical-align top
    font-size 12px
  .card-body
    margin-top 12px
    font-size 14px
  .card-cover
    margin-top 10px
    max-width 100%
  .card-footer
    margin-top 20px
  .el-badge__content--info
    background-color transparent
    color black
  .card-op
    font-size 24px
</style>
