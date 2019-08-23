import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/store'
import * as VueGoogleMaps from 'vue2-google-maps'

require('dotenv').config()

Vue.use(BootstrapVue)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDuf5lhIPGNM0BWS8M-LdYtLk3b9IgUd8Y"
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

