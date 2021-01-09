<template>
  <main class="container">
    <h2>Register as New Adviser</h2>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Email Address</label>
          <input class="form-control" v-model="email" type="email">
        </div>
        <div class="form-group">
          <label>First Name</label>
          <input class="form-control" v-model="firstname">
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input class="form-control" v-model="lastname">
        </div>
        <div class="form-group">
          <label>IBKR Flex Web Query Token</label>
          <input class="form-control" v-model="ibkrToken">
        </div>
        <div class="form-group">
          <label>Username</label>
          <input class="form-control" v-model="username">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input class="form-control" v-model="password" type="password">
        </div>
        <button class="btn btn-primary" @click="register">Register</button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios"

export default {
  name: "NewAdviser.vue",
  data() {
    return {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      ibkrToken: '',
      password: '',
      apiendpoint: process.env.VUE_APP_API_PATH + '/users/'
    }
  },
  methods: {
    register() {
      const postdata = {
        email: this.email,
        first_name: this.firstname,
        last_name: this.lastname,
        username: this.username,
        password: this.password,
        profile: {
          ibkrToken: this.ibkrToken
        }
      }
      axios.post(this.apiendpoint, postdata)
          .then(response => {
            console.log(response)
            this.$router.push('/login')
          })
          .catch((error) => {
            console.log(error)
            this.$bvToast.toast(error.toString(), {
              title: 'Error creating new adviser account',
              toaster: 'b-toaster-top-center'
            })
          })
    },
    showerror() {

    }
  }
}
</script>

<style scoped>

</style>