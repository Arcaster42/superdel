<template>
  <div class="hero">
    <b-container class="h-100">
        <b-row class="h-50 align-items-center justify-content-center text-center">
          <b-col class="col-lg-10 align-center">
            <img class="superdel_img" src="../assets/logo.png" />
            <h1 class="title">SuperDel</h1>
            <hr class="divider my-4">
            <p class="sub-title"><em>Grocery shopping made easy and accessible for all!</em></p>
          </b-col>
        </b-row>

        <b-row v-if="loginView === 'userType'" class="justify-content-center">
          <b-col cols="4">
              <b-button type="button" @click="userBtnClick" 
                variant="primary" block>I'm a User</b-button>
          </b-col>
          <b-col cols="4">
              <b-button type="button" @click="driverBtnClick"
                variant="primary" block>I want to be a Driver</b-button>
          </b-col>
        </b-row>
        
        <b-row class="justify-content-center">
          <b-col v-if="loginView === 'login'" cols="4">
            <LoginUser />
          </b-col>
          <b-col v-if="loginView === 'RegisterUser'" cols="6">
            <RegisterUser />
          </b-col>
          <b-col v-if="loginView === 'RegisterDriver'" cols="6">
            <RegisterDriver />
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginUser from './LoginUser'
import RegisterUser from './RegisterUser'
import RegisterDriver from './RegisterDriver'
import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    LoginUser,
    RegisterUser,
    RegisterDriver
  },
  computed: mapState(['loginView']),
  methods: {
    userBtnClick() {
      this.$store.commit('changeLoginView', 'RegisterUser')
    },
    driverBtnClick() {
      this.$store.commit('changeLoginView', 'RegisterDriver')
    }
  }

}
</script>

<style scoped>
.hero {
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.4), 
    rgba(0, 0, 0, 0.4)), 
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
  font-weight: bold;
}
.sub-title {
  color: white;
  font-size: 2rem;
}

.superdel_img {
  width: 80px;
  height: 80px;
}
</style>
