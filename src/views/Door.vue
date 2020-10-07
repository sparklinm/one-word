<template>
  <main>
    <ChatBot />
    <MoodMatch />
    <div
      class="chat-rooms"
    >
      <div class="title">
        聊天房间
      </div>
      <a-row
        :gutter="20"
      >
        <a-col
          v-for="(room, index) in rooms"
          :key="index"
          class="col-room"
          :lg="8"
          :md="12"
          :sm="12"
          :xs="12"
        >
          <Room

            class="chat-rooms-item"
            :room="room"
            @click="goPage(room.id)"
          />
        </a-col>
      </a-row>
    </div>
  </main>
</template>

<script>
import { getRooms } from '@/api/data'
import Room from '@/components/chat/Room'
import MoodMatch from '@/components/chat/MoodMatch'
import ChatBot from '@/components/chat/ChatBot'

export default {
  components: {
    Room,
    MoodMatch,
    ChatBot
  },
  data () {
    return {
      rooms: []
    }
  },
  async beforeCreate () {
    this.rooms = await getRooms()
  },
  methods: {
    goPage (id) {
      this.$router
        .push({
          path: `/chat-room/${id}`
        })
        .catch((err) => err)
    }
  }
}
</script>

<style lang='stylus'>
.chat-rooms
  .col-room
    text-align center
  .chat-rooms-item
    margin 0 0px 20px 0
    text-align left
  .title
    font-size 18px
    font-weight 600
    margin-bottom 10px

</style>
