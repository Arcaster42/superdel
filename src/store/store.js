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
    // Here we will create any mutations
  },
  
  actions: {
    // Here we will create any actions
  }
})