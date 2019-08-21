<template>
        <b-form>
          <span v-if="error">{{error}}</span>
          <b-form-group>
            <b-form-input v-model="first_name" type="text" placeholder="Enter your first name" required/>
            <b-form-input v-model="last_name" type="text" placeholder="Enter your last name" required/>
            <b-form-input v-model="email" type="text" placeholder="Enter your email" required/>
            <b-form-input v-model="password" type="password" placeholder="Choose a password" required/>
            <b-form-input v-model="address" type="text" placeholder="Enter your address" required/>
          </b-form-group>
          <div class="text-center">
            <b-button type="submit" variant="primary" block @click="registerClick">Register</b-button>
            <b-button type="button" @click="homeClick"
              variant="outline-info mt-4">Go Home</b-button>
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
      this.$store.commit('changeLoginView', 'userType')
      }
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
        //return home
      })
  }
}
</script>

<style scoped>
</style>
