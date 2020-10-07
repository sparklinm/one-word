import Vuex from 'vuex'
import user from './modules/user'
import chat from './modules/chat'

export default Vuex.createStore({
  modules: {
    user,
    chat
  }
})