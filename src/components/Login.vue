<template>
<div class="hero">
  <div class="container h-100">
      <div class="row h-100 align-items-center justify-content-center text-center">
        <div class="col-lg-10 align-center">
          <h1 class="title">SuperDel</h1>
          <hr class="divider my-4">
          <p class="sub-title">Grocery shopping made easy and accessible for all!</p>
        </div>
        <LoginUser />
      </div> 
  </div>
</div>
</template>

<script>
import LoginUser from './LoginUser'

export default {
  name: 'Login',
  components: {
    LoginUser
  },
  props: {
    msg: String
  }
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
