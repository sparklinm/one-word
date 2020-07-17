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

      <transition name="el-fade-in">
        <div
          v-show="show"
          class="banner-desc"
        >
          <span>
            山中何事？松花酿酒，春水煎茶。
          </span>
        </div>
      </transition>


      <transition name="el-fade-in">
        <el-image
          v-show="show"
          class="banner-img"
          fit="contain"
          :src="require('../assets/banner.png')"
        />
      </transition>
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
        const arr = ['chartRoom', 'CardDetail']

        this.bannerClass = {
          [`banner-${to.name}`]: true
        }

        if (arr.includes(to.name)) {
          this.show = false
        } else {
          this.show = true
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
    margin 0 auto
    display flex
    align-items  center
    justify-content space-between
  .banner-img
    height 100%
    width 30%
    max-width 220px
  .banner-img-con
    text-align right
  .banner-title
    font-size 24px
    font-weight 600
  .banner-desc
    vertical-align middle
</style>
