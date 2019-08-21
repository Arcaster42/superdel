<template>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input v-model="email" type="text" placeholder="Username" required/>
          </b-form-group>
          <b-form-group :invalid-feedback="invalidFeedback">
            <b-form-input v-model="password" type="password" placeholder="Password" required/>
          </b-form-group>
          <div class="text-center">
            <b-button type="submit" variant="primary" block @click="loginClick">Login</b-button>
            <b-button type="button" @click="registerClick"
              variant="outline-info mt-4">Register</b-button>
            <b-button type="button" @click="homeClick"
              variant="outline-info mt-4">Go Home</b-button>
          </div>
        </b-form>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginUser',
  data: () => ({
    email: null,
    password: null,
    error: null
  }),
  props: {
    msg: String
  },
  methods: {
    loginClick () {
      const userObj = {
        email: this.email,
        password: this.password
      }
      axios.get('/api/login', { params: userObj })
      .then((response) => {
        if (response.data.err) this.error = response.data.err
        if (response.data.userObj) this.$store.commit('setUser', response.data.userObj)
        //change view, go to user page
      })
    },
    registerClick () {
      this.$store.commit('changeLoginView', 'register')
    },
    homeClick () {
      this.$store.commit('changeLoginView', 'userType')
    }
  }
}
</script>

<style scoped>
</style>
