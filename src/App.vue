<template>
  <div id="app" class="bg-light min-vh-100">
    <TopNav/>
    <router-view />
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
import {mapGetters} from 'vuex'
import jwt_decode from "jwt-decode"
import store from "@/store"

export default {
  components: {
    TopNav
  },
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
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
  watch: {
    isAuthenticated(newval) {
      if (newval) {
        this.$bvToast.toast(`Welcome to Adviser Tools!`, {
          title: 'Login Successful',
          variant: 'primary',
          toaster: 'b-toaster-top-center',
          autoHideDelay: 5000
        })
      } else {
        this.$bvToast.toast(`You have been logged out.`, {
          title: 'Logout Notification',
          variant: 'primary',
          toaster: 'b-toaster-top-center',
          autoHideDelay: 5000
        })
      }
    }
  },
  mounted() {
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to
      // trigger. Do something with response data.

      // Decode stored jwt token, check if it is close to expiry. If it's close,
      // have vuex send a request to refresh the token.
      const token = localStorage.getItem('user-token')
      if (token != null) {
        const decoded = jwt_decode(token)
        const exp = decoded.exp
        const now = Date.now() / 1000
        const secondsleft = exp - now
        if (secondsleft < 240) {
          store.dispatch(AUTH_REFRESH)
        }
      }
      return response
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this
      // function to trigger. Do something with response error
      // const originalReq = error.config

      // tells vuex to logout if backend tells us our jwt token expired.
      if (error.response.status === 401) {
        store.dispatch(AUTH_LOGOUT)
      }
      return Promise.reject(error)
    })
  }
}
</script>

<style>
body {
  padding-top: 55px;
}
</style>
