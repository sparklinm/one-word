<template>
  <div
    class="banner main"
    :class="bannerClass"
  >
    <div
      class="banner-inline"
    >
      <!-- <div class="banner-title">
            One Word
          </div> -->

      <div
        v-show="show"
        class="banner-desc"
      >
        <span>
          山中何事？松花酿酒，春水煎茶。
        </span>
      </div>


      <img
        v-show="show"
        class="banner-img"
        :src="require('../assets/banner.png')"
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      bannerClass: {}
    }
  },
  computed: {},
  watch: {
    $route: {
      handler (to) {
        this.bannerClass = {
          [`banner-${to.name}`]: true
        }
        if (to.meta && to.meta.hideBanner) {
          this.show = false
          this.bannerClass['hide-on-narrow'] = true
        } else {
          this.show = true
          this.bannerClass['hide-on-narrow'] = false
        }
      },
      immediate: true
    }
  },
  mounted () {
    this.show = true
  },

  methods: {}
}
</script>

<style lang="stylus">
.banner
  height 220px
  text-align center
  padding 50px 0
  box-sizing border-box
  .banner-inline
    max-width 1200px;
    height 100%
    margin 0 auto
    display flex
    align-items  center
    justify-content space-between
  .banner-img
    height 100%
    width 30%
    max-width 220px
    object-fit contain
  .banner-img-con
    text-align right
  .banner-title
    font-size 24px
    font-weight 600
  .banner-desc
    vertical-align middle
</style>
