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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CardDetail.vue')
  },
  {
    path: '/creat',
    name: 'Creat',
    component: () =>
      import('../views/Creat.vue')
  },
  {
    path: '/door',
    name: 'Door',
    component: () =>
      import('../views/Door.vue')
  },
  {
    path: '/chart-room/:id',
    name: 'chartRoom',
    component: () =>
      import('../views/ChartRoom.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
