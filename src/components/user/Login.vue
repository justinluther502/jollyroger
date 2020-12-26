<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <h2>Adviser Login</h2>
    <form>
      <div class="form-group">
        <label>User name</label>
        <input class="form-control"
               v-model="username" type="text" placeholder="username"/>
        <label>Password</label>
        <input class="form-control"
               v-model="password" type="password" placeholder="password"/>
        <br>
        <button class="btn btn-primary" v-on:click="loginUser">Login</button>
      </div>
    </form>
  </main>
</template>

<script>
import { AUTH_REQUEST } from "@/store/actions/auth"

export default {
  name: "Login.vue",
  data () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    loginUser () {
      const username = this.username
      const password = this.password
      console.log('logging in...')
      this.$store.dispatch(AUTH_REQUEST, { username, password })
        .then(
            this.$router.push('/')
        )
    }
  }
}
</script>

<style scoped>

</style>