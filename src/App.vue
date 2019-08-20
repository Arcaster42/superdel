<template>
  <div id="app">
    <Login msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Login
  }
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
}
#app {
  margin: 0;
  height: 100%
}
</style>
