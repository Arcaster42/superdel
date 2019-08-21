<template>
  <div class="hero">
    <b-container class="h-100">
        <b-row class="h-50 align-items-center justify-content-center text-center">
          <b-col class="col-lg-10 align-center">
            <h1 class="title">SuperDel</h1>
            <hr class="divider my-4">
            <p class="sub-title">Grocery shopping made easy and accessible for all!</p>
          </b-col>
        </b-row> 
        <b-row v-if="loginView === 'userType'" class="justify-content-center">
          <b-col cols="4">
              <b-button type="submit" variant="primary" block>I'm a User</b-button>
          </b-col>
          <b-col cols="4">
              <b-button type="submit" variant="primary" block>I'm a Driver</b-button>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col v-if="showLogin" cols="4">
          <LoginUser />
          </b-col>
          <b-col v-if="showSignup" cols="6">
            <SignupUser />
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginUser from './LoginUser'
import SignupUser from './SignupUser'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    LoginUser,
    SignupUser
  },
  computed: 
   mapState(['loginView'])
}
</script>

<style scoped>
.hero {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.5), 
    rgba(0, 0, 0, 0.5)), 
    url("../assets/login.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  height: 100%;
}
.title {
  color: white;
  font-size: 4rem;
}
.sub-title {
  color: white;
}
</style>
