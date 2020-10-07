<template>
  <div class="mood-match">
    <div class="title">
      心情匹配
    </div>
    <div class="sex">
      <span>匹配性别：</span>
      <a-select
        v-model:value="value"
        placeholder=""
        style="width: 150px"
      >
        <a-select-option
          v-for="item in sexOptions"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>

    <div class="select-mood">
      <div class="select-mood-desc">
        选择你现在的心情，匹配相同心情的朋友聊聊天
      </div>
      <div class="select-mood-options">
        <span
          class="mood-happy"
          @click="match('happy')"
        >
          <Icon
            name="smile"
            class="icon-moode"
          />
          <span
            class="mood-text"
            style="margin-right:15px"
          >
            开心
          </span>
        </span>
        <span
          class="mood-sad"
          @click="match('sad')"
        >
          <span
            class="mood-text"
            style="margin-left:15px"
          >
            不开心
          </span>
          <Icon
            name="cry"
            class="icon-moode"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  receiveMatch, sendMatch, sendCancelMatch, recieveConnectError
} from '@/api/websocket'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      value: 'none',
      sexOptions: [
        {
          value: 'none',
          label: '不限'
        },
        {
          value: 'man',
          label: '男'
        },
        {
          value: 'woman',
          label: '女'
        },
        {
          value: 'other',
          label: '56种非传统性别'
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  created () {
    receiveMatch((data) => {
      if (data === 'no_match') {
        this.$message.warning({
          message: '<p>暂时没有和你同心情的人在匹配哦~</p><p>已在后台匹配，匹配成功将会通知。</p>'
        })
      } else {
        this.setChatPerson(data.chatPerson)
        this.setChatRoom(data.chatRoom)

        this.$confirm({
          title: '',
          content: '匹配成功是否前往聊天~',
          onOk () {
            this.$router.push({
              path: `/chat-one/${data.chatPerson.id}`
            })
          },
          onCancel () {
            sendCancelMatch()
          }
        })
      }
    })

    recieveConnectError(() => {
      this.$notification.warning({
        description: '服务器开小差了，对话功能将暂时不能使用！',
        duration: 1.5
      })
    })
  },
  methods: {
    ...mapMutations('chat', ['setChatPerson', 'setChatRoom']),
    match (mood) {
      const mod2text = {
        happy: '拥有高兴心情的人中...',
        sad: '心情不好的人中...'
      }
      const hide = this.$message.loading('匹配中' + mod2text[mood], 0)

      sendMatch({
        tags: {
          mood,
          sex: this.value
        },
        user: this.user
      })
      setTimeout(hide, 2500)
    }
  }
}
</script>

<style lang="stylus">
mood-option()
  display flex
  align-items center
  justify-content space-between
  padding 8px
  width 45%
  max-width 200px
  box-sizing border-box
  border-radius 30px
  color white
  cursor pointer

.mood-match
  margin-bottom 30px
  .title
    font-size 18px
    font-weight 600
    margin-bottom 10px
  .sex
    margin-bottom 20px
  .select-mood-options
    display flex
  .select-mood-desc
    font-size 14px
    margin-bottom 15px
  .mood-happy
    mood-option()
    margin-right 20px
    background #FF6666
  .mood-sad
    mood-option()
    background #6666CC
  .icon-moode
    font-size 30px
  .mood-text
    vertical-align middle
</style>
