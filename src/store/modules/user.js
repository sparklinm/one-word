const id = uuid.v4()

import { login } from '@/api/login'

export default {
  namespaced: true,
  state: {
    user: {
      id: id,
      sex: 'man',
      nickName: '请点击登录',
      signature: '火星人飘过~~'
    },
    token: ''
  },
  getters: {},
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
    },
    deleteToken (state) {
      state.token = ''
    }
  },
  actions: {
    async login ({ commit, state }, data) {
      const token = state.token

      if (token || (data && data.username && data.password)) {
        const res = await login(data, token)

        if (res.data) {
          commit('setUser', res.data)
          if (res.data.token) {
            console.log(res.data.token)

            commit('setToken', res.data.token)
          }
        }
      }
    }
  }
}
