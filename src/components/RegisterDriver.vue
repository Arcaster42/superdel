<template>
        <b-form>
          <span v-if="error">{{error}}</span>
          <b-form-group>
            <b-form-input v-model="first_name" type="text" placeholder="Enter your first name" required/>
            <b-form-input v-model="last_name" type="text" placeholder="Enter your last name" required/>
            <b-form-input v-model="email" type="text" placeholder="Enter your email" required/>
            <b-form-input v-model="password" type="password" placeholder="Choose a password" required/>
            <b-form-input v-model="address" type="text" placeholder="Enter your address" required/>
            <b-form-input v-model="phone" type="tel" placeholder="Enter your number" required/>
          </b-form-group>
          <div class="text-center">
            <b-button variant="primary" block @click="registerClick">Register</b-button>
            <b-button @click="homeClick" variant="outline-info mt-4">Go Home</b-button>
          </div>
        </b-form>
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
    phone: null
  }),
  methods: {
    homeClick () {
      this.$store.commit('changeLoginView', 'login')
      },
    registerClick (e) {
      e.preventDefault
        //show thank you for applying component
    },
  }
}
</script>

<style scoped>
</style>
