<template>
  <div
    class="room"
  >
    <img
      :src="room.background"
      alt=""
      class="room-background"
    >
    <div class="room-mask" />
    <div class="room-inline">
      <div class="room-name">
        {{ room.name }}
      </div>
      <div class="room-info">
        <span class="room-members-num">
          {{ `${room.num}/${room.total}人` }}
        </span>
        <span
          v-if="room.status==='actived'"
          class="room-status"
        >
          活跃
        </span>
      </div>
      <div class="room-members">
        <el-avatar
          v-for="(member,index) in room.members.slice(0,4)"
          :key="index"
          :src="member.head"
          :size="24"
          class="user-head"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      default: () => ({
        id: -1,
        name: '',
        background: '',
        total: 0,
        num: 0,
        status: '',
        members: [
          {
            id: -1,
            nickName: '',
            head: ''
          }
        ]
      })
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang='stylus'>
@import "~@/style/mixins.styl"

border-radius = 6px

.room
  display inline-block
  padding 15px
  border-radius border-radius
  // min-width 200px
  width 100%
  box-sizing border-box
  background-size contain
  background-repeat no-repeat
  position relative
  color white
  .room-background
    position absolute
    width 100%
    height 100%
    object-fit cover
    left 0
    top 0
    // filter blur(2px)
    border-radius border-radius
  .room-mask
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background  black
    opacity 0.2
    border-radius border-radius
  .room-inline
    position relative
    z-index 1
  .room-info
    font-size 12px
    margin-top 10px
  .room-status
    margin-left 5px
    tag()
  .room-members
    margin-top 10px
    white-space nowrap
  .user-head
    margin-right 8px
</style>
