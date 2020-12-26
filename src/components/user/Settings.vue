<template>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <h2>Adviser Profile</h2>
    <h4>{{last_name}}, {{first_name}}</h4>
    <table class="table table-dark">
      <tr>
        <td>Username:</td>
        <td>{{username}}</td>
      </tr>
      <tr>
        <td>Email Address:</td>
        <td>{{email}}</td>
      </tr>
      <tr>
        <td>User ID:</td>
        <td>{{userID}}</td>
      </tr>
      <tr>
        <td>Last Login:</td>
        <td>{{last_login}}</td>
      </tr>
      <tr>
        <td>IBKR API Key:</td>
        <td>{{ibkr_key}}</td>
      </tr>
    </table>
  </main>
</template>

<script>
import apiCall from "@/utils/api"
export default {
  name: "Settings.vue",
  data () {
    return {
      first_name: "",
      last_name: "",
      email: "",
      userID: null,
      last_login: null,
      ibkr_key: "",
      username: ""
    }
  },
  methods: {
    getUserProfile () {
      apiCall({ url: "/API/adviser/", method: "GET" })
          .then(resp => {
            this.first_name = resp.data.first_name
            this.last_name = resp.data.last_name
            this.email = resp.data.email
            this.userID = resp.data.id
            this.last_login = resp.data.last_login
            this.username = resp.data.username
            this.ibkr_key = resp.data.profile.ibkrToken
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  mounted () {
    this.getUserProfile()
  }
}
</script>

<style scoped>

</style>