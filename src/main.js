import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

import './lib'
import 'normalize.css'
import './style/index.styl'



const requireComponent = require.context('./components/global', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥路径`/xx`和文件类型`.xx`
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.prototype.$axios = axios
Vue.config.productionTip = false

const isPro = process.env.NODE_ENV === 'production'

axios.defaults.baseURL = isPro ? '//47.93.15.195:3001' : 'api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')