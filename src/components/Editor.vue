<template>
  <div class="write-box">
    <el-input
      v-model="input"
      placeholder="请输入..."
      show-password
      v-bind="$attrs"
      type="textarea"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      input: this.value
    }
  },
  watch: {
    value (val) {
      this.input = val
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.input)
    }
  }
}
</script>

<style lang="stylus">
.write-box
  background transparent
  border none
  resize none
  outline none
  box-sizing border-box
  display inline-block
  line-height 20px
  .el-textarea__inner
    border none
    resize none
    outline none
</style>
