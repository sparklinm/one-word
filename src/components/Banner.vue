<template>
  <div class="banner">
    <div class="banner-inline">
      <el-row :gutter="2">
        <el-col>
          <div class="banner-title">
            One Word
          </div>
          <div class="banner-title-desc">
            记录你此刻的心情，与陌生人畅聊
          </div>
        </el-col>
        <!-- <el-col
          :span="12"
          class="banner-img-con"
        >
          <el-image
            class="banner-img"
            fit="cover"
            :src="require('../assets/banner.png')"
          />
        </el-col> -->
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus">
.banner
  .banner-inline
    max-width 800px;
    margin 0 auto
    text-align center
    padding 50px 0
  .banner-img
    height 200px
    width 200px
  .banner-img-con
    text-align right
  .banner-title
    font-size 24px
    font-weight 600
  .banner-title-desc
    margin-top 5px
</style>
