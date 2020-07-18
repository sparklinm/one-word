<template>
  <div class="chat-room">
    <Chat
      ref="chat"
      :chat="chatOptions"
      @send="send"
      @get-history-message="getHistoryMessage"
      @change="handleChange"
    >
      <template v-slot:notice>
        <div>
          <div
            v-if="showRoomInfo"
            class="chat-room-statement"
          >
            拒绝不友善的人身攻击，色情暴力、广告推销、违反者请从外面把门带上
            <br>
            24小时无人说话房间自动解散 每个房间成员72小时不说话自动退出
          </div>

          <div
            v-if="showRoomInfo"
            class="chat-room-notice-container"
          >
            <div class="chat-room-notice">
              <div>房间简介</div>
              <div class="notice-conentet">
                <pre>{{ room.notice }}</pre>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Chat>
    <div class="room-data">
      <div class="title">
        房间资料
      </div>

      <div class="name">
        <div class="panel-title">
          房间名称
        </div>

        <div>
          {{ room.name }}
        </div>
      </div>

      <div class="brief">
        <div class="panel-title">
          房间简介
        </div>
        <div>
          <pre>{{ room.notice }}</pre>
        </div>
      </div>

      <div class="members">
        <div class="members-head panel-title">
          <span>
            房间成员
          </span>
          <span>
            {{ `查看${room.num}/${room.total}名房间成员` }}
            <i class="el-icon-arrow-right" />
          </span>
        </div>
        <div class="members-list">
          <div
            v-for="member in someMembers"
            :key="member.id"
            class="members-item"
          >
            <el-avatar
              :src="member.head"
              :size="46"
            />
            <div class="members-item-nickname">
              {{
                member.nickName.length > 3
                  ? member.nickName.slice(0, 3) + `...`
                  : member.nickName
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as chat from '@/js/websocket'
import { mapState } from 'vuex'
// import Editor from '@/components/Editor'
import Chat from './Chat'

export default {
  components: {
    // Editor,
    Chat
  },
  props: {
    room: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      showRoomInfo: true,
      someMembers: []
    }
  },
  computed: {
    ...mapState('user', ['user']),
    chatOptions () {
      return {
        title: this.room.name
      }
    }
  },
  watch: {
    room () {
      this.init()
    }
  },
  created () {
    this.init()

    chat.receiveChat((data) => {
      if (data.roomID !== this.room.id) {
        return
      }

      this.$refs.chat.receiveChat(data)
    })

    chat.receiveJoinRoom((data) => {
      this.someMembers.push(data.user)

      this.$refs.chat.pushMessage(data)
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
  beforeDestroy () {
    chat.removeAllListeners()
  },
  methods: {
    init () {
      if (this.room.id >= 0) {
        this.someMembers = this.room.members.slice(0, 4)
        chat.sendJoinRoom({
          room: this.room,
          user: this.user
        })
      }
    },
    handleChange (val) {
      if (val[0] && val[0].action === 'join') {
        this.showRoomInfo = true
      } else {
        this.showRoomInfo = false
      }
    },
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
.chat-room
  display flex
  box-shadow 0 2px 12px 0 rgba(0,0,0,0.1)
  .chat-box
    box-shadow none
  .chat-room-statement
    margin-top 10px
    text-align center
    font-size 12px
  .chat-room-notice-container
    margin-top 40px
  .chat-room-notice
    display inline-block
    font-size 14px
    text-align left
  .notice-conentet
    margin-top 5px
  .room-data
    width 30%
    padding 10px
    background #fff
    width 250px
    flex-shrink 0
    pre
      margin 0
    .title
      text-align center
      font-size 18px
      margin-bottom 15px
    .name,.brief
      box-sizing border-box
      padding 10px
      background #F3F4F6
      margin-bottom 15px
      border-radius 8px
      font-size 14px
    .panel-title
      margin-bottom 15px
      font-size 14px
      color #999
    .members-head
      display flex
      justify-content space-between
    .el-icon-arrow-right
      font-weight bold
    .members-item
      display inline-block
      margin-right 15px
    .members-item-nickname
      font-size 12px
</style>
