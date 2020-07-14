<template>
  <div class="chart-room">
    <div class="chart-room-inline">
      <div class="room-name">
        {{ room.name }}
      </div>

      <div
        ref="body"
        class="chart-room-body"
        @scroll="handleScroll"
      >
        <div
          ref="messageList"
          class="chart-room-body-inline"
        >
          <div class="history">
            历史消息
          </div>
          <div
            v-if="showSystemMessage"
            class="chart-room-statement"
          >
            拒绝不友善的人身攻击，色情暴力、广告推销、违反者请从外面把门带上
            <br>
            24小时无人说话房间自动解散 每个房间成员72小时不说话自动退出
          </div>

          <div
            v-if="showSystemMessage"
            class="chart-room-notice-container"
          >
            <div class="chart-room-notice">
              <div>房间简介</div>
              <div class="notice-conentet">
                <pre>{{ room.notice }}</pre>
              </div>
            </div>
          </div>
          <div class="chart-contents">
            <div
              v-for="message in messages"
              :key="message.date"
              ref="messages"
              class="chart-item"
            >
              <div class="item-head">
                <el-avatar
                  :src="message.head"
                  :size="46"
                />
              </div>

              <div class="item-body">
                <div class="item-username">
                  {{ message.username }}
                </div>
                <div class="item-content">
                  <pre>{{ message.content }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import { sendChartMessage, receiveChartMessage } from '@/js/websocket'
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
  data () {
    return {
      room: {
        id: 0,
        name: '测试房间',
        background: require('@/assets/head.jpg'),
        total: 100,
        num: 50,
        status: 'actived',
        notice: '1请不要在群里攻击别人\n2尊重别人',
        members: [
          {
            id: 0,
            nickName: '想不想喝奶茶',
            head: require('@/assets/head.jpg')
          },
          {
            id: 1,
            nickName: '不想喝奶茶',
            head: require('@/assets/head.jpg')
          },
          {
            id: 2,
            nickName: '喝奶茶',
            head: '/user/head.jpg'
          }
        ]
      },
      content: '',
      messages: [
        {
          username: '不想和奶茶',
          head: require('@/assets/head.jpg'),
          content: '人生自古谁无死',
          date: new Date().getTime()
        }
      ],
      showSystemMessage: true,
      someMembers: []
    }
  },
  mounted () {
    this.someMembers = this.room.members.slice(0, 4)
    this.totalMessages = this.messages.concat()
    this.end = 0
    this.max = 5

    receiveChartMessage((data) => {
      this.totalMessages.push(data)
      this.messages.push(data)

      if (this.messages.length > this.max && isScrollBottom(this.$refs.body)) {
        const start = this.messages.length - this.max

        this.messages = this.messages.slice(start)
        this.end = this.totalMessages.length - this.max
        this.showSystemMessage = false
      }
      if (isScrollBottom(this.$refs.body)) {
        this.$nextTick(() => {
          this.$refs.body.scrollTop = 10000
        })
      }
    })
  },
  methods: {
    send () {
      if (this.content === '') {
        return
      }
      sendChartMessage({
        username: '不想和奶茶',
        head: require('@/assets/head.jpg'),
        content: this.content
      })
      this.content = ''
    },
    handleScroll () {
      if (this.$refs.body.scrollTop === 0) {
        setTimeout(() => {
          if (this.end === 0) {
            return
          }
          let start = this.end - this.max

          if (start < 0) {
            start = 0
          }

          this.messages.unshift(...this.totalMessages.slice(start, this.end))
          this.end = start

          if (this.end === 0) {
            this.showSystemMessage = true
          }

          // // 有问题
          // const $firstMessage = this.$refs.messages[0]
          // const $firstMessage = document.querySelector('.chart-item')
          const oScrollHeight = this.$refs.body.scrollHeight

          this.$nextTick(() => {
            // $firstMessage.scrollIntoView()
            keepScrollContent(this.$refs.body, oScrollHeight)
          })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="stylus">
head-height = 60px
room-height = 600px
body-height = room-height - head-height - 97px

.chart-room
  border-radius: 4px
  height room-height
  position relative
  display flex
  max-width 900px
  .chart-room-inline
    position relative
    width 80%
  .room-name
    text-align center
    font-size 22px
    height head-height
    line-height head-height
  .chart-room-body
    padding 20px
    height body-height
    overflow auto
    white-space pre
    box-sizing border-box
  .history
    font-size 12px
    color #696969
    text-align center
  .chart-room-statement
    margin-top 10px
    text-align center
    font-size 12px
  .chart-room-notice-container
    margin-top 40px
  .chart-room-notice
    display inline-block
    font-size 14px
    text-align left
  .notice-conentet
    margin-top 5px
  .editor-container
    position absolute
    left 0
    right 0
    bottom 0
  .editor
    width 100%
    height 100%
  .chart-contents
    margin-top 20px
  .chart-item
    display flex
    margin-bottom 30px
  .item-head
    margin-right 10px
  .item-username
    font-size 12px
  .item-content
    display inline-block
    font-size 16px
    padding 4px 10px
    border-radius 20px
    margin-top 10px
    &>pre
      margin 0
  .room-data
    width 40%
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
