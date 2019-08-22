import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: {},
		loginView: 'login',
		mainView: 'Login',
		driverView: 'all',
		driverMyOrders: [],
		driverSelectedOrders: [],
		checkoutItems: {},
		openOrderedItems: [],
	},

	getters: {
		// Here we will create any getters
	},

	mutations: {
		changeOpenOrderedItems(state, items) {
			state.openOrderedItems = items
		},
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
			  
			// axios({ method: 'post',
			// 		url: `https://twilio-sms.p.rapidapi.com/2010-04-01/Accounts/ACbf1200f68a515bc07fe07982a08b4a7a/Messages.json`,
			// 		headers: {
			// 			"X-RapidAPI-Host": "twilio-sms.p.rapidapi.com",
			// 			"X-RapidAPI-Key": "4884853b23msh8a413a69d57ee9ap15cdebjsnf5bb7e493926",
			// 			"Content-Type": "application/x-www-form-urlencoded"
			// 		  },
			// 		params: {
			// 			from: 'SUPERDELI',
			// 			to:'8108044528191',
			// 			body:'Order on the way',
			// 			AccountSid: 'ACbf1200f68a515bc07fe07982a08b4a7a'}
			// 		})
			//   .then((response) => console.log(response))
			//   .catch((error) => console.log(error))
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
