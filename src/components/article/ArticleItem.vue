<template>
  <div class="article-item">
    <div class="item-header">
      <el-avatar
        :src="article.head"
        class="user-head"
      />
      <div>
        <div class="nickname">
          {{ article.nickName }}
        </div>

        <div class="signature text-gray">
          {{ article.signature }}
        </div>
      </div>
    </div>
    <div class="item-body">
      <pre
        ref="content"
        class="article-content"
        :class="{'article-hidden':showIconExpand || showIconShrink}"
        :style="contentStyle"
        @click="$emit('click')"
      >{{ article.content }}</pre>
      <div class="holder" />
      <div
        v-show="showIconExpand || showIconShrink"
        class="icon-expand-container"
        style="cursor:pointer"
        @click="toggleContent"
      >
        <i
          v-show="showIconExpand"
          class="el-icon-arrow-down"
        />

        <i
          v-show="showIconShrink"
          class="el-icon-arrow-up"
        />
      </div>
      <div
        v-if="article.imgs.length"
        class="cm-img-list"
      >
        <div
          v-for="img in article.imgs"
          :key="img"
          class="cm-img-list_item-area"
        >
          <el-image
            :src="img"
            alt
            :preview-src-list="article.imgs"
            class="cm-img-list_item-container"
          />
        </div>
      </div>
    </div>
    <div
      class="item-foot"
      @click="$emit('click')"
    >
      <el-badge
        :value="article.comments.length"
        :max="99"
        type="info"
      >
        <i class="el-icon-chat-square el-icon-middle" />
      </el-badge>
    </div>
  </div>
</template>

<script>
import { hiddenRows } from '@/js/util'

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => ({
        comments: []
      })
    }
  },
  data () {
    return {
      contentStyle: {},
      cachedContentStyle: {},
      showIconExpand: false,
      showIconShrink: false
    }
  },
  computed: {},
  mounted () {
    this.contentHeight()
    window.addEventListener('resize', this.contentHeight)
  },
  destroyed () {
    window.removeEventListener('resize', this.contentHeight)
  },
  methods: {
    contentHeight () {
      const obj = hiddenRows(this.$refs.content)

      if (obj.hidden) {
        this.showIconExpand = true
        this.contentStyle = this.cachedContentStyle = {
          height: obj.height + 'px',
          overflow: 'hidden',
          marginBottom: '0px'
        }
      }
    },
    toggleContent () {
      this.showIconExpand = !this.showIconExpand
      this.showIconShrink = !this.showIconExpand
      if (this.showIconExpand) {
        this.contentStyle = this.cachedContentStyle
      } else {
        this.contentStyle = {}
      }
    }
  }
}
</script>

<style lang='stylus'>
.article-item
  background #fff
  padding 15px
  border-radius 6px
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  margin-bottom 20px
  .item-header
   display flex
   align-items center
   margin-bottom 20px
  .user-head
   margin-right 15px
   flex-shrink 0
  .nickname
    font-size 14px
  .signature
    font-size 12px
  .article-content
    margin-bottom 20px
    transition all 0.3s ease
  .icon-expand-container
    text-align center
    font-size 30px
    line-height 1
    margin-bottom 10px
    height 60px
    transform translateY(-25px)
    background #fff
    opacity 0.6
    &::after
      content ''
      display inline-block
      height 100%
      vertical-align bottom
   .cm-img-list
    width 60%
    margin-bottom 20px
</style>
