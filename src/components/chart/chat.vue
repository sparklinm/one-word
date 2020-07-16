<template>
  <div class="chat-room">
    <div class="chat-room-inline">
      <div class="room-name">
        {{ room.name }}
      </div>

      <div style="position:relative">
        <div
          ref="body"
          class="chat-room-body"
          @scroll="handleScroll"
        >
          <div
            ref="messageList"
            class="chat-room-body-inline"
          >
            <div
              ref="history"
              class="history"
            >
              历史消息
            </div>

            <div
              v-if="showSystemMessage"
              class="chat-room-statement"
            >
              拒绝不友善的人身攻击，色情暴力、广告推销、违反者请从外面把门带上
              <br>
              24小时无人说话房间自动解散 每个房间成员72小时不说话自动退出
            </div>

            <div
              v-if="showSystemMessage"
              class="chat-room-notice-container"
            >
              <div class="chat-room-notice">
                <div>房间简介</div>
                <div class="notice-conentet">
                  <pre>{{ room.notice }}</pre>
                </div>
              </div>
            </div>

            <div class="chat-contents">
              <div
                v-for="message in messages"
                :key="message.id"
                ref="messages"
              >
                <div
                  v-if="message.type==='user' && message.userID !== user.id"
                  class="chat-item"
                >
                  <div class="item-head-left">
                    <el-avatar
                      :src="message.head"
                      :size="46"
                    />
                  </div>

                  <div class="item-body-left">
                    <div class="item-username">
                      {{ message.nickName }}
                    </div>
                    <div class="item-content">
                      <pre>{{ message.content }}</pre>
                    </div>
                  </div>
                </div>

                <div
                  v-else-if="message.type === 'user' && message.userID === user.id"
                  class="chat-item chat-item-right"
                >
                  <div
                    class="item-body item-body-right"
                  >
                    <div class="item-username">
                      {{ message.nickName }}
                    </div>

                    <div class="item-content-container-right">
                      <i
                        v-if="message.loading"
                        class="el-icon-loading"
                      />
                      <div class="item-content item-content-right">
                        <pre>{{ message.content }}</pre>
                      </div>
                    </div>
                  </div>
                  <div class="item-head-right">
                    <el-avatar
                      :src="message.head"
                      :size="46"
                    />
                  </div>
                </div>

                <div
                  v-else-if="message.type === 'system'"
                  class="chat-item-system text-gray"
                >
                  {{ message.user.nickName | cutText(10) }}
                  {{ action2Text[message.action] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          v-show="showBtnNewMessage"
          class="new-message"
          @click="toBottom"
        >
          新消息
        </a>
      </div>

      <!-- exact 只有xx键按下被触发 -->
      <div class="editor-container">
        <Editor
          v-model="content"
          class="editor"
          :rows="4"
          @keydown.enter.exact.native.prevent
          @keyup.enter.exact.native="send"
        />
      </div>
    </div>

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
import { cutText } from '@/js/util'
import { mapState } from 'vuex'
import Editor from '@/components/Editor'

function isScrollBottom (el) {
  const { scrollTop, scrollHeight, clientHeight } = el

  return scrollTop === scrollHeight - clientHeight
}

function keepScrollContent (el, oScrollHeight) {
  const { scrollHeight: nScrollHeight, scrollTop } = el

  el.scrollTop = nScrollHeight - oScrollHeight + scrollTop
}

export default {
  components: {
    Editor
  },
  filters: {
    cutText: function (value, length) {
      return cutText(value, length)
    }
  },
  props: {
    room: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      content: '',
      messages: [],
      showSystemMessage: true,
      someMembers: [],
      showBtnNewMessage: false,
      action2Text: {
        join: '加入了房间',
        leave: '离开了房间'
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  watch: {
    room () {
      this.init()
    }
  },
  created () {
    this.init()
    this.max = 5


    chat.receiveChat((data) => {
      if (data.roomID !== this.room.id) {
        return
      }

      if (data.userID !== this.user.id) {
        this.addMessage(data)
        return
      }
      const index = this.messages.findIndex(m => m.id === data.id)

      if (index > -1) {
        this.messages.splice(index, 1, data)
      }
    })

    chat.receiveJoinRoom((data) => {
      this.someMembers.push(data.user)

      this.messages.push(data)
    })

    chat.receiveEnterRoom((data) => {
      this.messages = this.messages.concat(data.content)
      this.toBottom()
    })

    chat.receiveGetMessages((data) => {
      setTimeout(() => {
        this.messages.unshift(...data.content)

        // // 有问题
        // const $firstMessage = this.$refs.messages[0]
        // const $firstMessage = document.querySelector('.chat-item')
        const oScrollHeight = this.$refs.body.scrollHeight

        this.$nextTick(() => {
          // $firstMessage.scrollIntoView()
          keepScrollContent(this.$refs.body, oScrollHeight)
          this.lodaingIns.close()
        })
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
        this.messages = this.room.messages.concat()
        chat.sendJoinRoom({
          room: this.room,
          user: this.user
        })
      }
    },
    send () {
      if (this.content === '') {
        return
      }

      const id = uuid.v4()
      const message = {
        id,
        roomID: this.room.id,
        userID: this.user.id,
        head: this.user.head,
        nickName: this.user.nickName,
        content: this.content,
        type: 'user',
        loading: true
      }

      this.addMessage(message)
      chat.sendChat({
        id,
        roomID: this.room.id,
        user: this.user,
        content: this.content
      })
      this.content = ''
    },
    addMessage (data) {
      this.messages.push(data)
      if (this.messages.length > this.max && isScrollBottom(this.$refs.body)) {
        const start = this.messages.length - this.max

        this.messages = this.messages.slice(start)
        this.showSystemMessage = false
      }
      if (isScrollBottom(this.$refs.body)) {
        this.toBottom()
      } else {
        this.showBtnNewMessage = true
      }
    },
    toBottom () {
      this.$nextTick(() => {
        this.$refs.body.scrollTop = 10000
        this.showBtnNewMessage = false
      })
    },
    handleScroll () {
      if (this.$refs.body.scrollTop === 0) {
        this.lodaingIns = this.$loading({
          target: this.$refs.history,
          fullscreen: false,
          text: '获取更多消息中',
          customClass: 'el-loading-small'
        })

        chat.sendGetMessages({
          roomID: this.room.id,
          user: this.user,
          to: this.messages[0].date,
          size: this.max,
          direction: -1
        })
        return
      }

      if (this.showBtnNewMessage) {
        if (isScrollBottom(this.$refs.body)) {
          this.showBtnNewMessage = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">
head-height = 60px
room-height = 600px
body-height = room-height - head-height - 97px

.chat-room
  border-radius: 4px
  height room-height
  position relative
  display flex
  width 900px
  .chat-room-inline
    position relative
    width 70%
  .room-name
    text-align center
    font-size 22px
    height head-height
    line-height head-height
  .chat-room-body
    padding 20px
    height body-height
    overflow auto
    white-space pre-wrap
    box-sizing border-box
  .history
    font-size 12px
    color #696969
    text-align center
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
  .chat-contents
    margin-top 20px
  .chat-item
    display flex
    margin-bottom 30px
  .chat-item-right
    justify-content: flex-end
  .chat-item-system
    text-align center
    font-size 12px
    white-space nowrap
    margin-bottom 30px
  .item-body-right
    margin-left 30px
  .item-content-container-right
    display flex
    justify-content: flex-end
    align-items center
    .el-icon-loading
      margin-right 10px
  .item-head-right
    margin-left 10px
  .item-body-left
    margin-right 30px
  .item-head-left
    margin-right 10px
  .item-username
    font-size 12px
  .item-content
    display inline-block
    font-size 16px
    padding 4px 10px
    border-radius 10px
    margin-top 10px
    &>pre
      margin 0
  .new-message
    position absolute
    bottom 0
    font-size 12px
    left 50%
    transform translateX(-50%)
    padding 5px
    color #004b77
    cursor pointer
  .editor-container
    position absolute
    left 0
    right 0
    bottom 0
  .editor
    width 100%
    height 100%
  .room-data
    width 30%
    padding 10px
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
