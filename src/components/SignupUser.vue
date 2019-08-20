<template>
        <b-form @submit="onSubmit">
          <b-form-group>
            <b-form-input v-model="username" type="text" placeholder="Enter your email" required/>
          </b-form-group>
          <b-form-group :invalid-feedback="invalidFeedback">
            <b-form-input v-model="password" type="password" placeholder="Choose a password" required/>
          </b-form-group>
          <b-form-group>
            <b-form-input v-model="address" type="text" placeholder="Enter your address" required/>
          </b-form-group>
          <b-form-group label="I'm signing up as a:">
            <b-form-radio v-model="selected" name="type" value="user">User</b-form-radio>
            <b-form-radio v-model="selected" name="type" value="staff">Driver</b-form-radio>
        </b-form-group>
          <div class="text-center">
            <b-button type="submit" variant="primary" block>Sign Up</b-button>
            <b-button variant="outline-info mt-4" @click="$emit('swap-form')">Go Home</b-button>
          </div>
        </b-form>
</template>

<script>
export default {
  name: 'SignupUser',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
