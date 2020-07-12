<template>
  <div
    ref="editor"
    style="text-align:left"
  />
</template>

<script>
import E from 'wangeditor'

export default {
  name: 'Editor',
  data () {
    return {
      editorContent: ''
    }
  },
  mounted () {
    const editor = new E(this.$refs.editor)

    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
  methods: {
    getContent: function () {
    }
  }
}
</script>

<style scoped>
</style>