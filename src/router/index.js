import Vue from 'vue'
import VueRouter from 'vue-router'
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
    component: () => import('../views/Creat.vue')
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
      hideBanner: true
    },
    props: true
  },
  {
    path: '/chat-one/:id',
    name: 'ChatOne',
    meta: {
      hideBanner: true
    },
    component: () => import('../views/ChatOne.vue')
  },
  {
    path: '/chat-bot',
    name: 'ChatBot',
    meta: {
      hideBanner: true
    },
    component: () => import('../views/ChatBot.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
