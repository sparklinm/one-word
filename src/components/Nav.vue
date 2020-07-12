<template>
  <nav class="nav">
    <el-menu
      class="nav-inline"
      mode="horizontal"
      active-text-color="#ffa600"
      @select="goPage"
    >
      <el-menu-item index="">
        墙
      </el-menu-item>
      <el-menu-item index="door">
        传送门
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  methods: {
    goPage (path) {
      this.$router
        .push({
          path: `/${path}`
        })
        .catch((err) => err)
    }
  }
}
</script>

<style lang="stylus">
.nav
  height 100px
  line-height 100px
  .nav-inline
   margin 0 300px
   background transparent
</style>
