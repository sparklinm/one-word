<template>
  <div class="write-box">
    <el-input
      v-model="input"
      v-bind="$attrs"
      resize="none"
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
    },
    clear () {
      this.input = ''
      this.handleInput()
    }
  }
}
</script>

<style lang="stylus">

@import "~@/style/mixins.styl"

placeholder-color = #707070

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
    outline none
    background transparent
    &::-webkit-input-placeholder
      color placeholder-color
    &::-moz-placeholder
      color placeholder-color
    &:-moz-placeholder
      color placeholder-color
    &:-ms-input-placeholder
      color placeholder-color
</style>
