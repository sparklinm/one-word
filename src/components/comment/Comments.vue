<template>
  <div class="comments">
    <div class="comments-head">
      <span>全部 {{ comments.length }}</span>
    </div>
    <div class="comments-list">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment-item"
      >
        <div class="comment-head">
          <el-avatar
            :src="comment.head"
            class="user-head"
            :size="30"
          />
          <span class="nickname">{{ comment.nickName }}</span>
        </div>
        <div class="comment-body">
          <div
            class="content"
            v-html="comment.content"
          />
        </div>
        <div class="comment-foot">
          <span class="text-gray">
            {{ comment.date }}
          </span>
        </div>
      </div>
    </div>
    <write-commpent />
    <div />
  </div>
</template>

<script>
import WriteCommpent from './WriteCommpent'

export default {
  components: {
    WriteCommpent
  },
  props: {
    comments: {
      type: Array,
      default: () => (
        [
          {
            id: 0,
            nickName: '酒中客',
            head: require('@/assets/head.jpg'),
            content: '加油',
            date: '12:56'
          }
        ]
      )
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">
.comments
  margin-top 100px
  padding 30px
  border 1px solid #e6e6e6
  .comments-head
    margin-bottom 15px
  .comment-head
    margin-bottom 10px
  .user-head
    vertical-align middle
  .nickname
    vertical-align middle
    font-size 14px
    margin-left 10px
  .comment-body
    padding-left 40px
    margin-bottom 10px
    font-size 14px
  .comment-foot
    padding-left 40px
    font-size 14px
    opacity 0.8
</style>
