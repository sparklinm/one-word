import app from './app'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './mock'
import './lib'
import 'normalize.css'
import './style/index.styl'

const requireComponent = require.context('./components/global', true, /\.vue$/)

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 剥路径`/xx`和文件类型`.xx`
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  // 全局注册组件
  app.component(componentName, componentConfig.default || componentConfig)
})


app.use(router)
app.use(store)
app.mount('#app')

export default app