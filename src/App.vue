<template>
  <div
    id="app"
    ref="root"
  >
    <Nav />
    <div class="container">
      <Banner />
      <!-- <transition
        :name="transitionName"
        @after-enter="afterLeave"
        @before-leave="beforeLeave"
      >
        <router-view class="main" />
      </transition> -->
      <router-view
        v-slot="{ Component }"
        class="main"
      >
        <transition :name="transitionName">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </transition>
      </router-view>
    </div>
    <a-back-top :visibility-height="200" />
  </div>
</template>

<script lang="ts">
import Nav from '@/components/nav/Nav.vue'
import Banner from '@/components/Banner.vue'

import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  ComponentInternalInstance,
  defineComponent
} from 'vue'
import axios from 'axios'
import mitt from 'mitt'
import { useRoute } from 'vue-router'

interface rootInstance extends ComponentInternalInstance {
  on: Function
}

const emitter = mitt()

function rootFont () {
  const changeRootFont = function () {
    let rootFont = (document.body.clientWidth / 768) * 100

    if (rootFont > 100) {
      rootFont = 100
    }
    document.documentElement.style.fontSize = rootFont + 'px'
  }

  changeRootFont()
  onUnmounted(() => {
    window.removeEventListener('resize', changeRootFont)
  })
  window.addEventListener('resize', changeRootFont)
}

function routerAnimate () {
  const transitionName = ref('')
  const route = useRoute()

  watch(route, () => {
    transitionName.value = 'router-fade'
  })

  return transitionName
}

export default defineComponent({
  components: {
    Nav,
    Banner
  },
  setup () {
    const ins = getCurrentInstance()

    if (ins !== null) {
      ins.root.emit = emitter.emit;

      (ins.root as rootInstance).on = emitter.on
    }

    onMounted(function () {
      const node = document.querySelector('.cm-enter-loading')

      node && node.remove()
    })

    const transitionName = routerAnimate()

    rootFont()

    axios.get('/test').then((data) => {
      console.log(data)
    })

    return {
      transitionName
    }
  }
})
</script>

<style lang="stylus">
  .container
    padding-left 220px
    position relative
</style>

<style>
  .aa {
    color: #f5f5dc;
    background: transparent;
  }

  .router-fade-enter-to,
  .router-fade-leave {
    opacity: 1;
  }

  .router-fade-leave-active {
    transition: all 0.2s ease;
  }

  .router-fade-leave-active .icon-creat {
    display: none;
  }

  .router-fade-enter-active {
    transition: all 0.2s ease 0.2s;
  }

  .router-fade-enter,
  .router-fade-leave-to {
    transform: translate(1%, 0);
    opacity: 0;
  }
</style>
