<template>
        <b-form>
          <span v-if="error">{{error}}</span>
          <b-form-group>
            <b-form-input class="mb-2" v-model="first_name" type="text" placeholder="Enter your first name" required/>
            <b-form-input class="mb-2" v-model="last_name" type="text" placeholder="Enter your last name" required/>
            <b-form-input class="mb-2" v-model="email" type="text" placeholder="Enter your email" required/>
            <b-form-input class="mb-2" v-model="password" type="password" placeholder="Choose a password" required/>
            <b-form-input class="mb-2" v-model="address" type="text" placeholder="Enter your address" required/>
          </b-form-group>
          <div class="text-center">
            <b-button variant="primary" block @click="registerClick">Register</b-button>
            <b-button @click="homeClick" class="mt-2" variant="outline-info">Go Home</b-button>
          </div>
        </b-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterUser',
  data: () => ({
    email: null,
    first_name: null,
    last_name: null,
    address: null,
    password: null,
    error: null
  }),
  methods: {
    homeClick () {
      this.$store.commit('changeLoginView', 'login')
      },
    registerClick (e) {
      e.preventDefault
      const userObj = {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        address: this.address,
        password: this.password
      }
      axios.post('/api/users', userObj)
      .then((response) => {
        if (response.data.err) this.error = response.data.err
        console.log(response)
        if (response.data.userObj) this.$store.commit('setUser', response.data.userObj)
        //return home
      })
    },
  }
}
</script>

<style scoped>
</style>
