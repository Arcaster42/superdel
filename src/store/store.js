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
    userCartItems: [],
    userCartQuantities: [],
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
    setCartItems(state, itemObj) {
      state.userCartItems = itemObj.itemArray
      state.userCartQuantities =itemObj.quantitiesArray
    },

  },

  actions: {
    // Here we will create any actions
  }
})
