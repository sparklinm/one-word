<template>
  <a-textarea
    v-model:value="input"
    v-bind="$attrs"
    resize="none"
    class="write-box"
    type="textarea"
    @input="handleInput"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      input: this.value
    }
  },
  watch: {
    modelValue (val) {
      this.input = val
    }
  },
  methods: {
    handleInput () {
      this.$emit('update:modelValue', this.input)
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
  box-sizing border-box
  width 100%
  height 100%
  line-height 20px
  border none
  outline none
  resize none
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
