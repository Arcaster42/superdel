<template>
  <div id="app">
    <Login v-if="mainView==='Login'"/>
    <StaffLandingPage v-if="mainView==='StaffLandingPage'" />
    <UserLandingPage v-if="mainView==='UserLandingPage'" />
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import StaffLandingPage from "./components/StaffLandingPage.vue";
import UserLandingPage from "./components/UserLandingPage.vue"
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Login,
    StaffLandingPage,
    UserLandingPage
  },
  computed: mapState(["mainView"])
};
</script>

<style>
html,
body {
  height: 100%;
}
#app {
  margin: 0;
  height: 100%;
}
</style>
