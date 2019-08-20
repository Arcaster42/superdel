import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

// add vuex to package.json
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentview: "landingPage",
  },
  mutations: {
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

