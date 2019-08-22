<template>
        <b-form>
          <b-form-group>
            <b-form-input v-model="email" type="text" placeholder="Username" required/>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="password" type="password" placeholder="Password" required/>
          </b-form-group>
          <div class="text-center">
            <b-button type="submit" variant="primary" block @click="loginClick">Login</b-button>
            <b-button type="button" @click="registerClick"
              variant="outline-info mt-4">Register</b-button>
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
    loginClick (e) {
      e.preventDefault()
      const userObj = {
        email: this.email,
        password: this.password
      }
      axios.get('/api/login', { params: userObj })
      .then((response) => {
        if (response.data.err) this.error = response.data.err
        else if (response.data.email) {
          console.log("response", response)
          if (response.data.staff === null){
            this.$store.commit('setUser', response.data)
          }
          else if (response.data.staff == true) {
            this.$store.commit('setStaff', response.data)
          }
        }
      })
    },
    registerClick (e) {
      e.preventDefault()
      this.$store.commit('changeLoginView', 'userType')
    }
  }
}
</script>

<style scoped>
</style>
