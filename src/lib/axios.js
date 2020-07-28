import axios from 'axios'
import Vue from 'vue'
import store from '@/store'

const isPro = process.env.NODE_ENV === 'production'

axios.defaults.baseURL = isPro
  ? window.location.protocol === 'http'
    ? 'http://back.end.sparklinm.cn:3001'
    : 'https://back.end.sparklinm.cn:3002'
  : '/api'

const getToken = (authorization) => {
  return authorization.split(' ')[1]
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 请求附带token
  const token = store.state.user.token

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const authorization = response.headers.authorization

  if (authorization) {
    const token = getToken(authorization)

    store.commit('user/setToken', token)
  }
  return response
}, function (error) {
  const res = error.response

  // 身份验证失败
  if (res.status === 401) {
    const token = store.state.user.token

    if (token) {
      store.commit('user/setUser', {
        id: 0,
        sex: 'man',
        nickName: '请点击登录',
        signature: '火星人飘过~~'
      })
      Vue.prototype.$notify({
        message: '登录已过期',
        type: 'warning'
      })
      store.commit('user/deleteToken')
    }
  }

  return Promise.reject(error)
})


Vue.prototype.$axios = axios
