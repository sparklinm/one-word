<template>
  <div class="chart-room">
    <div class="room-name">
      {{ room.name }}
    </div>

    <div
      ref="body"
      class="chart-room-body"
      @scroll="handleScroll"
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
        <div
          class="chart-room-notice"
        >
          <div>房间简介</div>
          <div class="notice-conentet">
            {{ room.notice }}
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
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="editor-container">
      <Editor
        v-model="content"
        class="editor"
        :rows="4"
        @keydown.enter.native.exact="beforSend"
        @keydown.shift.enter.native.stop
        @keyup.shift.enter.native.prevent
        @keyup.enter.exact.native="send"
      />
    </div>
  </div>
</template>

<script>
import { sendChartMessage, receiveChartMessage } from '@/js/websocket'
import Editor from '@/components/Editor'

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
      showSystemMessage: true
    }
  },
  mounted () {
    this.totalMessages = this.messages.concat()
    this.end = 0
    this.max = 5

    receiveChartMessage((data) => {
      this.totalMessages.push(data)
      this.messages.push(data)

      if (this.messages.length > this.max) {
        const start = this.messages.length - this.max

        this.messages = this.messages.slice(start)
        this.end = this.totalMessages.length - this.max
        this.showSystemMessage = false
      }
      this.$nextTick(() => {
        this.$refs.body.scrollTop = 10000
      })
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
    beforSend (e) {
      e.preventDefault()
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
          const $firstMessage = document.querySelector('.chart-item')

          this.$nextTick(() => {
            $firstMessage.scrollIntoView()
          })
        }, 1000)
      }
    }
  }
}
</script>

<style lang='stylus'>
head-height = 60px
room-height = 600px
body-height = room-height - head-height - 97px

.chart-room
  border-radius: 4px
  height room-height
  position relative
  .room-name
    text-align center
    font-size 22px
    height head-height
    line-height head-height
  .chart-room-body
    padding 20px
    height body-height
    overflow auto
    white-space pre-line
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

</style>
