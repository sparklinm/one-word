import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Wall from '../views/Wall.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Wall',
    component: Wall
  },
  {
    path: '/card/:id',
    name: 'CardDetail',
    meta: {
      hideBanner: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CardDetail.vue'),
    props: true
  },
  {
    path: '/creat',
    name: 'Creat',
    component: () => import('../views/Creat.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/door',
    name: 'Door',
    component: () => import('../views/Door.vue')
  },
  {
    path: '/chat-room/:id',
    name: 'ChartRoom',
    component: () => import('../views/ChatRoom.vue'),
    meta: {
      hideBanner: true,
      auth: true
    },
    props: true
  },
  {
    path: '/chat-one/:id',
    name: 'ChatOne',
    meta: {
      hideBanner: true,
      auth: true
    },
    component: () => import('../views/ChatOne.vue')
  },
  {
    path: '/chat-bot',
    name: 'ChatBot',
    meta: {
      hideBanner: true,
      auth: true
    },
    component: () => import('../views/ChatBot.vue')
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.auth) {
    const token = store.state.user.token

    if (token) {
      next()
    } else {
      // next({
      //   path: '/',
      //   // 将跳转的路由path作为参数，登录成功后跳转到该路由
      //   query: {
      //     redirect: to.fullPath
      //   }
      // })
      Vue.prototype.$confirm('检查到您未登录，是否立即登录').then(() => {
        store.dispatch('user/login', {
          username: '123',
          password: '456'
        }).then(() => {
          next()
        })
      })
    }
  } else {
    next()
  }
})

export default router
