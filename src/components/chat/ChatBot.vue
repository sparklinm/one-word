<template>
  <div class="chat-bot">
    <div class="title">
      聊天机器人
    </div>
    <div
      class="room"
      @click="toChatBot"
    >
      <img
        style="width: 100%; height: 100%"
        :src="require('../../assets/chat-bot.jpg')"
        fit="cover"
        class="room-background"
      >
      <div class="room-mask" />
      <div class="room-inline">
        <div class="room-name">
          和智能机器人聊聊天吧
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    toChatBot () {
      this.$router.push({
        path: '/chat-bot'
      })
    }
  }
}
</script>

<style lang="stylus">
border-radius = 6px

.chat-bot
  margin-bottom 30px
  .title
    font-size 18px
    font-weight 600
    margin-bottom 10px
  .room
    position relative
    width 100%
    max-width 300px
    height 150px
    padding 15px
</style>
