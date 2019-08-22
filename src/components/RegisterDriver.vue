<template>
    <div>
        <b-form v-if="currentView === 'DriverForm'">
          <span v-if="error">{{error}}</span>
          <b-form-group>
            <b-form-input class="mb-2" v-model="first_name" type="text" placeholder="Enter your first name" required inline/>
            <b-form-input class="mb-2" v-model="last_name" type="text" placeholder="Enter your last name" required inline/>
            <b-form-input class="mb-2"  v-model="email" type="text" placeholder="Enter your email" required/>
            <b-form-input class="mb-2"  v-model="password" type="password" placeholder="Choose a password" required/>
            <b-form-input class="mb-2"  v-model="address" type="text" placeholder="Enter your address" required/>
            <b-form-input class="mb-2"  v-model="phone" type="tel" placeholder="Enter your number" required/>
          </b-form-group>
          <div class="text-center">
            <b-button variant="primary" block @click="registerClick">Register</b-button>
            <b-button @click="homeClick" variant="outline-info mt-2">Go Home</b-button>
          </div>
        </b-form>
        <div v-if="currentView === 'Thanks'" class="text-center text-white">
            <h3>Thanks for applying!</h3>
            <b-button @click="homeClick" variant="outline-info mt-4">Go Home</b-button>
        </div>
        <b-modal v-model="modalShow" hide-footer>
            <template slot="modal-title">
                Join the SuperDel team!
            </template>
            <div class="d-block text-center">
                <h4>Thank you for applying to be a Driver!</h4>
                <h4>An administrator will contact you shortly at the email address provided.</h4>
            </div>
            <b-button class="mt-3" block @click="homeClick">Go Home</b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'RegisterDriver',
  data: () => ({
    email: null,
    first_name: null,
    last_name: null,
    address: null,
    password: null,
    error: null,
    phone: null,
    currentView: 'DriverForm',
    modalShow: false
  }),
  methods: {
    homeClick () {
      this.$store.commit('changeLoginView', 'login')
      },
    registerClick (e) {
      e.preventDefault
      this.modalShow = !this.modalShow
      this.currentView = 'Thanks'
        //show thank you for applying component
    },
  }
}
</script>

<style scoped>
</style>
