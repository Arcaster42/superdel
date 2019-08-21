import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loginView: 'login',
    // mainView: 'Login',
    mainView: 'StaffLandingPage',
    driverView: 'all',
    driverMyOrders: [],
    driverSelectedOrders: [],
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
      if (state.driverSelectedOrders.includes(value)) {
        return
      }
      state.driverSelectedOrders.push(value)
    },
    sendSelectedOrders(state, value) {
      state.driverMyOrders = value;
      state.driverView = 'my';
    }
  },

  actions: {
    // Here we will create any actions
  }
})
