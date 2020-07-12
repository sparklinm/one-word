<template>
  <div class="write-comment">
    <textarea
      id=""
      v-model="content"
      name=""
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
export default {
  data () {
    return {
      content: ''
    }
  },
  computed: {},
  methods: {
    confirm () {
      const comment = {
        content: this.content,
        date: new Date().toLocaleString()
      }
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
    padding 10px
    box-sizing border-box
    line-height 20px
    background #ffe0cc
  .ops
    text-align right
    margin-top 10px
</style>
