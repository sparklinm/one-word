
const id = uuid.v4()

export default {
  namespaced: true,
  state: {
    user: {
      id: id,
      head: '/user/head0.jpg',
      nickName: '飞翔的荷兰猪' + id,
      signature: '挖一个坑，种一棵树。吃一口饭，睡一天觉。'
    }
  },
  getters: {},
  mutations: {},
  actions: {}
}