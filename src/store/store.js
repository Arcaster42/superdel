import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loginView: 'userType',
    driverView: 'all',
    driverMyOrders: [],
    mainView: 'Login'
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
    },
    staffPage(state, value) {
      state.driverView = value
    },
    selectOrder(state, value) {
      if (state.driverMyOrders.includes(value)) {
        return
      }
      state.driverMyOrders.push(value)
    }
  },

  actions: {
    // Here we will create any actions
  }
})
