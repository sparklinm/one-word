<template>
  <a-modal
    v-model:visible="modalVisible"
    :footer="null"
    :closable="false"
    :mask-closable="false"
    :after-close="afterClose"
    class="loading-modal"
    wrap-class-name="loading-modal-wrap"
    :mask-style="maskStyle"
  >
    <div>
      <a-spin
        size="large"
      />
    </div>
    <div class="loading-text">
      {{ text }}
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '加载中'
    }
  },
  emits: ['update:visible'],
  data () {
    return {
      modalVisible: this.visible,
      maskStyle: {
        backgroundColor: 'rgb(255, 255, 255, 0.7)'
      }
    }
  },
  computed: {},
  watch: {
    visible (val) {
      this.modalVisible = val
    }
  },
  methods: {
    afterClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="stylus">
.loading-modal
  top 200px
  .ant-modal-content
    box-shadow none
    background-color transparent
    text-align center
  .loading-text
    color #409eff
</style>
