<template>
  <main class="chat-main">
    <div class="chat-one">
      <Chat
        ref="chat"
        :chat="chatOptions"
        @send="send"
      />
    </div>
  </main>
</template>

<script>
import { getRobotChat } from '@/js/robot'
import { mapState } from 'vuex'
import Chat from '@/components/chat/Chat'

export default {
  components: {
    Chat
  },
  data () {
    return {
      chatOptions: {
        title: '聊天机器人'
      },
      robatMessage: {},
      userMessage: {}
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  created () {
    this.userMessage = {
      id: '',
      userID: this.user.id,
      nickName: this.user.nickName,
      head: this.user.head,
      content: '',
      date: 0,
      type: 'user',
      loading: true
    }
    this.robatMessage = {
      id: '',
      userID: uuid.v4(),
      nickName: '聊天机器人',
      head: require('@/assets/robat-head.jpg'),
      content: '',
      date: 0,
      type: 'user'
    }
  },
  methods: {
    send (content) {
      const myMessage = this.generateMessage(this.userMessage, content)

      this.$refs.chat.pushMessage(myMessage)
      getRobotChat(content).then((message) => {
        this.$refs.chat.pushMessage(
          this.generateMessage(this.robatMessage, message.Reply)
        )
        myMessage.loading = false
        this.$refs.chat.receiveChat(myMessage)
      })
    },
    generateMessage (message, content) {
      const copy = Object.assign({}, message)

      copy.content = content
      copy.date = new Date().getTime()
      copy.id = uuid.v4()
      return copy
    }
  }
}
</script>

<style lang="stylus"></style>
