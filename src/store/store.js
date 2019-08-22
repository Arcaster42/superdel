import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {},
		loginView: 'login',
		mainView: 'Login',
		driverView: 'all',
		driverMyOrders: [],
		driverSelectedOrders: [],
		checkoutItems: {}
	},

	getters: {
		// Here we will create any getters
	},

	mutations: {
		changeLoginView(state, view) {
			state.loginView = view
		},
		setUser(state, user) {
      console.log(user)
      state.user = user
      state.mainView = 'UserLandingPage'
    },
    setStaff(state, user) {
      state.user=user
      state.mainView = 'StaffLandingPage'
    },
		leaveStaffPage(state, value) {
      state.loginView = 'login'
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
			state.checkoutItems = {
				email: state.user.email,
				...itemObj
			}
		},
		emptyCheckoutItems(state) {
			state.checkoutItems = {}
		}
	},

	actions: {
		// Here we will create any actions
	}
})
