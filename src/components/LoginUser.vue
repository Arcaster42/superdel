<template>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input v-model="username" type="text" placeholder="Username" required/>
          </b-form-group>
          <b-form-group :invalid-feedback="invalidFeedback">
            <b-form-input v-model="password" type="password" placeholder="Password" required/>
          </b-form-group>
          <div class="text-center">
            <b-button type="submit" variant="primary" block>Sign In</b-button>
            <b-button variant="outline-info mt-4" @click="$emit('swap-form')">Sign Up?</b-button>
          </div>
        </b-form>
</template>

<script>
export default {
  name: 'LoginUser',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
