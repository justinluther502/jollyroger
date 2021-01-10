<template>
  <div id="app" class="bg-light min-vh-100">
    <TopNav/>
    <router-view/>
    <!--main window stuff will fill in here-->
  </div>
</template>

<script
    src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/
    umd/popper.min.js"
    integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrn
    Qq4sF86dIHNDz0W1"
    crossorigin="anonymous">
</script>

<script>
import TopNav from './components/LandingPage/TopNav'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {AUTH_LOGOUT, AUTH_REFRESH} from "@/store/actions/auth"

export default {
  components: {
    TopNav
  },
  data() {
    return {
      showSide: true
    }
  },
  methods: {
    toggleSide() {
      this.showSide = !this.showSide
      console.log(this.showSide)
    }
  },
  created() {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config &&
            !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT)
          // you can also redirect to /login if needed !
        }
        throw err
      })
    })
  }
}
</script>

<style>
body {
  padding-top: 55px;
}

@media (max-width: 979px) {
  body {
    padding-top: 0px;
  }
}
</style>
