<template>
  <div class="mood-match">
    <div class="title">
      心情匹配
    </div>
    <div class="sex">
      <span>匹配性别：</span>
      <el-select
        v-model="value"
        placeholder=""
      >
        <el-option
          v-for="item in sexOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
  receiveMatch, sendMatch, sendCancelMatch, removeAllListeners
} from '@/js/websocket'
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
        this.$message({
          dangerouslyUseHTMLString: true,
          type: 'warning',
          message: '<p>暂时没有和你同心情的人在匹配哦~</p><p>已在后台匹配，匹配成功将会通知。</p>'
        })
      } else {
        this.setChatPerson(data.chatPerson)
        this.setChatRoom(data.chatRoom)
        this.$confirm('匹配成功是否前往聊天~', {
          type: 'success'
        }).then(() => {
          this.$router.push({
            path: `/chat-one/${data.chatPerson.id}`
          })
        }).catch(() => {
          sendCancelMatch()
        })
      }
    })
  },
  methods: {
    ...mapMutations('chat', ['setChatPerson', 'setChatRoom']),
    match (mood) {
      const mod2text = {
        happy: '拥有高兴心情的人中...',
        sad: '心情不好的人中...'
      }
      const ins = this.$loading({
        text: '匹配中' + mod2text[mood],
        background: 'rgba(0, 0, 0, 0.6)'
      })

      setTimeout(() => {
        sendMatch({
          tags: {
            mood,
            sex: this.value
          },
          user: this.user
        })
        ins.close()
      }, 3000)
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
