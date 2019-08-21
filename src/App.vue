<template>
  <div id="app">
    <Login />
    <StaffLandingPage v-if="mainView==='StaffLandingPage'" />
  </div>
</template>

<script>
import Login from "./components/Login.vue";
import StaffLandingPage from "./components/StaffLandingPage.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Login,
    StaffLandingPage
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
