
const id = uuid.v4()

const chatPerson = {
  id: id,
  head: '/user/head0.jpg',
  nickName: '飞翔的荷兰猪' + id.slice(0, 12),
  signature: '挖一个坑，种一棵树。吃一口饭，睡一天觉。'
}

export default {
  namespaced: true,
  state: {
    chatPerson,
    chatRoom: {
      id: uuid.v4(),
      name: 'temp room',
      background: '',
      members: [chatPerson],
      messages: []
    }
  },
  getters: {},
  mutations: {
    setChatPerson (state, person) {
      state.chatPerson = person
    },
    setChatRoom (state, room) {
      state.chatRoom = room
    }
  },
  actions: {}
}