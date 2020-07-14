<template>
  <div class="write-comment">
    <Editor
      ref="editor"
      v-model="content"
      rows="5"
      class="write-box"
      placeholder="写下你想对作者说的话。"
    />
    <div class="ops">
      <el-button
        type="primary"
        @click="confirm"
      >
        确定
      </el-button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import Editor from '@/components/Editor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    confirm () {
      const comment = {
        ...this.user,
        content: this.content,
        date: dayjs().format('YYYY-MM-DD dddd HH:mm:ss.SSS')
      }

      this.$emit('add', comment)
      this.$refs.editor.clear()
    }
  }
}
</script>

<style lang="stylus">
.write-comment
  font-size 14px
  margin-top 30px
  .write-box
    background transparent
    border none
    resize none
    outline none
    height 60%
    width 100%
    box-sizing border-box
    line-height 20px
    background #ffe0cc
  .ops
    text-align right
    margin-top 10px
</style>
