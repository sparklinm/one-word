<template>
  <div class="card-detail">
    <div class="card-detail-head">
      <el-avatar
        :src="card.head"
        class="user-head"
      />
      <span class="nickname">{{ card.nickName }}</span>
    </div>
    <div class="card-detail-body">
      <div
        class="content"
        v-html="card.content"
      />
      <div
        class="imgs cm-img-list"
      >
        <div
          v-for="img in card.imgs"
          :key="img"
          class="img-item-contianer cm-img-list_item-area"
        >
          <el-image
            :src="img"
            class="img-item cm-img-list_item-container"
            fit="cover"
            lazy
            :preview-src-list="[img]"
          />
        </div>
      </div>
    </div>
    <div class="card-detail-foot">
      <span class="text-gray">
        {{ time }}
      </span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    card: {
      type: Object,
      default: () => ({
        id: 0,
        nickName: '',
        head: '',
        content: '',
        imgs: [],
        date: ''
      })
    }
  },
  data () {
    return {}
  },
  computed: {
    time () {
      return dayjs(this.card.date).fromNow()
    }
  },
  methods: {}
}
</script>

<style lang="stylus">
.card-detail
  .card-detail-head
    margin-bottom 30px
  .nickname
    vertical-align top
    margin-left 20px
  .card-detail-body
    margin-bottom 40px
  .content
    white-space pre-wrap
  .imgs
    margin-top 50px
  .card-detail-foot
    text-align right
    font-size 14px


</style>
