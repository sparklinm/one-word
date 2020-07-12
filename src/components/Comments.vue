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
          {{ comment.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      default: () => (
        [
          {
            id: 0,
            nickName: '酒中客',
            head: require('../assets/head.jpg'),
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
  margin-top 20px
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
