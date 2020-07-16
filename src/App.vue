<template>
  <div id="app">
    <Nav />
    <div class="container">
      <Banner />
      <transition
        :name="transitionName"
        @after-enter="afterLeave"
        @before-leave="beforeLeave"
      >
        <router-view class="main" />
      </transition>
    </div>
    <el-backtop
      :visibility-height="200"
    />
  </div>
</template>

<script>
import Nav from '@/components/nav/Nav'
import Banner from '@/components/Banner'

export default {
  components: {
    Nav,
    Banner
  },
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {},
  watch: {
    $route () {
      this.transitionName = 'router-fade'
    }
  },
  created () {
    window.addEventListener('resize', this.changeRootFont)
    this.changeRootFont()
  },
  destroyed () {
    window.removeEventListener('resize', this.changeRootFont)
  },
  methods: {
    changeRootFont () {
      let rootFont = (document.body.clientWidth / 768) * 100

      if (rootFont > 100) {
        rootFont = 100
      }
      document.documentElement.style.fontSize = rootFont + 'px'
    },
    afterLeave () {
      this.$root.$emit('router-animationend')
    },
    beforeLeave () {
      this.$root.$emit('router-before-leave')
    }
  }
}
</script>

<style lang="stylus">
.container
  padding-left 220px
  position relative
</style>

<style>
.aa {
  color: #d34300;
  background: transparent;
}

.router-fade-enter-to,
.router-fade-leave {
  opacity: 1;
}

.router-fade-leave-active {
  transition: all 0.3s ease;
}

.router-fade-leave-active .icon-creat {
  display: none;
}

.router-fade-enter-active {
  transition: all 0.3s ease 0.3s;
}

.router-fade-enter,
.router-fade-leave-to {
  transform: translate(3%, 0);
  opacity: 0;
}
</style>
