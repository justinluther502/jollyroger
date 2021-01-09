<template>
  <main role="main" class="container">
    <h2>Adviser Login</h2>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>User name</label>
          <input class="form-control"
                 v-model="username" type="text" placeholder="username"/>
          <label>Password</label>
          <input class="form-control"
                 v-model="password" type="password" placeholder="password"/>
          <br>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
          <b-button v-on:click="loginUser" class="mr-1" variant="primary">
            Login
          </b-button>
          <b-button :to="loginUser" class="mr-1" variant="success">
            Register as New Adviser
          </b-button>
      </div>
    </div>
  </main>
</template>

<script>
import {AUTH_REQUEST} from "@/store/actions/auth"

export default {
  name: "Login.vue",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    loginUser() {
      const username = this.username
      const password = this.password
      console.log('logging in...')
      this.$store.dispatch(AUTH_REQUEST, {username, password})
          .then(
              this.$router.push('/')
          )
    }
  }
}
</script>

<style scoped>

</style>