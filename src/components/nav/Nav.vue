<template>
  <nav class="nav">
    <div
      class="nav-inline"
    >
      <div class="user">
        <el-avatar
          :src="user.head"
          class="user-head"
          :size="100"
        />
        <div>
          <span class="nickname">{{ user.nickName }}</span>
        </div>
      </div>
      <el-menu
        mode="vertical"
        active-text-color="#ffaf1c"
        text-color="#fff"
        background-color="#242424"
        @select="goPage"
      >
        <el-menu-item index="">
          墙
        </el-menu-item>
        <el-menu-item index="door">
          传送门
        </el-menu-item>
      </el-menu>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      user: {
        nickName: '想不想喝奶茶',
        head: require('@/assets/head.jpg')
      }
    }
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
  width 200px
  position fixed
  top 0
  bottom 0
  background #242424
  color white
  font-size 14px
  .user
    padding 0 20px
  .nav-inline
    padding 150px 0
  .user
    margin-bottom 20px
    text-align center
  .user-head
    margin-bottom 10px
  .el-menu
    background transparent
    border-right: none;
  .el-menu-item
    padding 0 30px
  .el-menu-item.is-active
    background black !important
    border-left 4px solid #ffaf1c
</style>
