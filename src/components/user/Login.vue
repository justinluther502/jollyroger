<template>
  <main role="main" class="container">
    <h2>Adviser Login</h2>
    <form @submit.prevent="loginUser(username, password)">
      <div class="row">
        <div class="col col-md-6">
          <div class="form-group">
            <label class="font-weight-bold">User name</label>
            <input class="form-control"
                   v-model="username" type="text" placeholder="username"/>
            <label class="mt-2 font-weight-bold">Password</label>
            <input class="form-control"
                   v-model="password" type="password" placeholder="password"/>
            <br>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col col-12 col-md-6">
          <b-button block type="submit" class="mr-1" variant="primary">
            Login
          </b-button>
        </div>
      </div>
      <div class="row">
        <div class="col col-12 col-md-6">
          <b-button block :to="{ name: 'register' }" class="mr-1 mt-1"
                    variant="success">
            Register as New Adviser
          </b-button>
        </div>
      </div>
    </form>

    <br>
    <br>
    <div class="row">
      <div class="col col-12 col-md-6">
        <b-button block @click="demoLogin" class="mr-1 mt-1"
                  variant="warning">
          HN DEMO ONLY - Login as Fake Adviser
        </b-button>
      </div>
    </div>

    <div class="row">
      <div class="col mt-2">
        <b-spinner v-if="waiting" variant="primary"/>
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
      password: "",
      waiting: false,
      errormsg: ""
    }
  },
  methods: {
    demoLogin() {
      console.log("logging in for demo...")
      this.loginUser('HNdemoadviser', 'gharLk4R32')
    },
    loginUser(username, password) {
      this.waiting = true
      // const username = this.username
      // const password = this.password
      this.$store.dispatch(AUTH_REQUEST, {username, password})
          .then(() => {
            this.waiting = false
            // this.$router.push('/')
          })
          .catch((error) => {
            // handle error
            this.waiting = false
            if (error.response) {
              // Request made and server responded
              if (error.response.status === 400) {
                this.errormsg = "Sorry, we didn't recognize that username / " +
                    "password."
                this.$bvToast.toast(this.errormsg, {
                  title: '400 - Bad Request',
                  toaster: 'b-toaster-top-center',
                  autoHideDelay: 3000
                })
              } else {
                this.errormsg = error.response.statusMessage
                this.$bvToast.toast(this.errormsg, {
                  title: error.response.statusCode,
                  toaster: 'b-toaster-top-center',
                  autoHideDelay: 3000
                })
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request)
            } else {
              // Something happened in setting up the request that triggered
              // an Error
              console.log('Error', error.message)
            }
          })
    }
  }
}
</script>

<style scoped>

</style>