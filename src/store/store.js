import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'Ryohei',
    loginView: 'login',
    mainView: 'UserLandingPage',
    driverView: 'all',
    driverMyOrders: [],
    driverSelectedOrders: [],
    checkoutItems: [],
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
    leaveStaffPage(state, value) {
      state.mainView = value
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
      state.driverMyOrders = value
      state.driverView = 'my'
    },
    setCheckoutItems(state, itemObj) {
      state.checkoutItems = itemObj
    },

  },

  actions: {
    // Here we will create any actions
  }
})
