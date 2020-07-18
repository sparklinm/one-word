<template>
  <div class="chat-one">
    <Chat
      ref="chat"
      :chat="chatOptions"
      @send="send"
      @get-history-message="getHistoryMessage"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as chat from '@/js/websocket'

import Chat from './Chat'

export default {
  components: {
    Chat
  },
  data () {
    return {}
  },
  computed: {
    ...mapState('chat', {
      chatPerson: state => state.chatPerson,
      room: state => state.chatRoom
    }),
    ...mapState('user', ['user']),
    chatOptions () {
      return {
        title: this.chatPerson.nickName
      }
    }
  },
  created () {
    chat.receiveChat((data) => {
      if (data.roomID !== this.room.id) {
        return
      }

      this.$refs.chat.receiveChat(data)
    })

    chat.receiveEnterRoom((data) => {
      this.$refs.chat.pushMessage(data.content)
    })

    chat.receiveGetMessages((data) => {
      setTimeout(() => {
        this.$refs.chat.unshiftMessage(data.content)
      }, 1000)
    })
  },
  methods: {
    send (content) {
      const id = uuid.v4()
      const message = {
        id,
        roomID: this.room.id,
        userID: this.user.id,
        head: this.user.head,
        nickName: this.user.nickName,
        content: content,
        type: 'user',
        loading: true
      }

      this.$refs.chat.pushMessage(message)
      chat.sendChat({
        id,
        roomID: this.room.id,
        user: this.user,
        content: content
      })
    },
    getHistoryMessage () {
      chat.sendGetMessages({
        roomID: this.room.id,
        user: this.user,
        to: this.$refs.chat.messages[0].date,
        size: this.$refs.chat.max,
        direction: -1
      })
    }
  }
}
</script>

<style lang="stylus">
.chat-one
  width 80%
</style>
