import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loginView: 'userType'
  },
  
  getters: {
    // Here we will create any getters
  },
  
  mutations: {
    changeLoginView(state, view) {
        state.loginView = view
    },
    setUser(state, user) {
        state.user = user
    }
  },
  
  actions: {
    // Here we will create any actions
  }
})