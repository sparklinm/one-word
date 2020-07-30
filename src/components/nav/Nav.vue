<template>
  <div>
    <i
      class="el-icon-s-unfold btn-unfold-nav"
      @click="unFoldNav"
    />
    <div
      v-show="showMask"
      class="mask"
      @click="foldNav"
    />
    <transition name="slide">
      <nav
        v-show="showNav"
        class="nav"
      >
        <div
          class="nav-inline"
        >
          <div
            class="user"
            @click="avatarClick"
          >
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
            :default-active="defaultActive"
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
    </transition>
  </div>
</template>

<script>
import {
  mapState, mapActions, mapMutations
} from 'vuex'

export default {
  data () {
    return {
      showNav: true,
      showMask: false,
      defaultActive: ''
    }
  },
  computed: {
    ...mapState('user', ['user', 'token'])
  },
  watch: {
    $route (to) {
      const page = to.path.split('/')[1] || ''

      if (['', 'door'].includes(page)) {
        this.defaultActive = page
      }
      if (this.isNarrow) {
        this.foldNav()
      }
    }
  },
  created () {
    const token = JSON.parse(localStorage.getItem('token'))

    if (token) {
      this.setToken(token)
    }
    this.login()
    window.onunload = () => {
      localStorage.setItem('token', JSON.stringify(this.token))
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('user', {
      login: 'login'
    }),
    ...mapMutations('user', {
      setToken: 'setToken'
    }),
    avatarClick () {
      const token = this.token

      if (token) {
        this.goPage('')
      } else {
        const ins = this.$loading({
          lock: true,
          text: '登录中',
          background: 'rgba(0, 0, 0, 0.6)'
        })

        this.login({
          username: '123',
          password: '456'
        }).then(() => {
          ins.close()
          this.$notify({
            message: '登录成功',
            type: 'success'
          })
        })
      }
    },
    goPage (path) {
      this.$router
        .push({
          path: `/${path}`
        })
        .catch((err) => err)
    },
    unFoldNav () {
      this.showNav = true
      this.showMask = true
    },
    foldNav () {
      this.showNav = false
      this.showMask = false
    },
    handleResize () {
      if (document.documentElement.clientWidth <= 768) {
        this.isNarrow = true
        this.showNav = false
        this.showMask = false
      } else {
        this.isNarrow = false
        this.showNav = true
        this.showMask = false
      }
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
  z-index 500
  .user
    padding 0 20px
    cursor pointer
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

.btn-unfold-nav
  font-size 26px
  padding 20px
  position fixed
  color #d34300
  top 0px
  left 0
  z-index 100

.slide-enter-active
.slide-leave-active
  transition transform 0.3s ease

.slide-enter,.slide-leave-to
  transform translateX(-100%)
</style>
