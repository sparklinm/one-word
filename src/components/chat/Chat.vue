<template>
  <div class="chat-box">
    <div class="chat-box-inline">
      <div class="chat-title">
        {{ chat.title }}
      </div>

      <div style="position:relative">
        <div
          ref="body"
          class="chat-box-body"
          @scroll="handleScroll"
        >
          <div
            ref="messageList"
            class="chat-box-body-inline"
          >
            <a-spin
              :spinning="spinning"
              :tip="spinningTip"
            >
              <div
                ref="history"
                class="history"
              >
                历史消息
              </div>
            </a-spin>
            <slot name="notice" />

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
                    <a-avatar
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
                      <LoadingOutlined
                        v-if="message.loading"
                        style="margin-right:10px"
                      />

                      <div class="item-content item-content-right">
                        <pre>{{ message.content }}</pre>
                      </div>
                    </div>
                  </div>
                  <div class="item-head-right">
                    <a-avatar
                      :src="message.head"
                      :size="46"
                    />
                  </div>
                </div>

                <div
                  v-else-if="message.type === 'system'"
                  class="chat-item-system text-gray"
                >
                  {{ cutText(message.user.nickName) }}
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
          @keydown.enter.exact.prevent
          @keyup.enter.exact="send"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
  props: {
    chat: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['get-history-message', 'send', 'change'],
  data () {
    return {
      content: '',
      messages: [],
      showBtnNewMessage: false,
      action2Text: {
        join: '加入了房间',
        leave: '离开了房间'
      },
      spinning: false,
      spinningTip: '获取更多消息中'
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  watch: {
    messages (val) {
      this.$emit('change', val)
    }
  },
  created () {
    this.max = 5
  },
  methods: {
    cutText: cutText,
    send () {
      if (this.content === '') {
        return
      }
      this.$emit('send', this.content)
      this.content = ''
    },
    pushMessage (data) {
      if (Array.isArray(data)) {
        this.messages = this.messages.concat(data)
      } else {
        this.messages.push(data)
      }
      if (this.messages.length > this.max && isScrollBottom(this.$refs.body)) {
        const start = this.messages.length - this.max

        this.messages = this.messages.slice(start)
      }
      if (isScrollBottom(this.$refs.body)) {
        this.toBottom()
      } else {
        this.showBtnNewMessage = true
      }
    },
    unshiftMessage (data) {
      this.messages.unshift(...data)

      // // 有问题
      // const $firstMessage = this.$refs.messages[0]
      // const $firstMessage = document.querySelector('.chat-item')
      const oScrollHeight = this.$refs.body.scrollHeight

      this.$nextTick(() => {
        // $firstMessage.scrollIntoView()
        keepScrollContent(this.$refs.body, oScrollHeight)
        this.spinning = false
      })
    },
    receiveChat (data) {
      if (data.userID !== this.user.id) {
        this.pushMessage(data)
        return
      }
      const index = this.messages.findIndex(m => m.id === data.id)

      if (index > -1) {
        this.messages.splice(index, 1, data)
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
        this.spinning = true

        this.$emit('get-history-message')
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
box-height = 600px
body-height = box-height - head-height - 97px

.chat-box
  border-radius: 4px
  height box-height
  position relative
  width 100%
  .chat-box-inline
    position relative
    height 100%
  .chat-title
    text-align center
    font-size 22px
    height head-height
    line-height head-height
  .chat-box-body
    padding 20px
    height body-height
    overflow auto
    white-space pre-wrap
    box-sizing border-box
  .history
    font-size 12px
    color #696969
    text-align center
  .chat-box-statement
    margin-top 10px
    text-align center
    font-size 12px
  .chat-box-notice-container
    margin-top 40px
  .chat-box-notice
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
</style>
