<template>
  <div id="app" class="bg-light min-vh-100">
    <TopNav/>
    <router-view/>
    <!--main window stuff will fill in here-->
  </div>
</template>

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
    },
    checkAuth() {
      // Decode stored jwt token, check if it is close to expiry.
      // If it's expired, do an orderly logout.
      // If it's close, have vuex send a request to refresh the token.
      const token = localStorage.getItem('user-token')
      if (token != null) {
        const decoded = jwt_decode(token)
        const exp = decoded.exp
        const now = Date.now() / 1000
        const secondsleft = exp - now
        if (secondsleft < 0) {
          store.dispatch(AUTH_LOGOUT)
        } else if (secondsleft < 240) {
          store.dispatch(AUTH_REFRESH)
        }
      }
    }
  },
  watch: {
    isAuthenticated(newval) {
      if (newval) {
        this.$bvToast.toast(`Welcome to Indie Adviser`, {
          title: 'Login Successful',
          variant: 'success',
          toaster: 'b-toaster-top-center',
          autoHideDelay: 3000
        })
        this.$router.push('/')
      } else {
        this.$bvToast.toast(`You have been logged out.`, {
          title: 'Logout Notification',
          variant: 'warning',
          toaster: 'b-toaster-top-center',
          autoHideDelay: 3000
        })
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.checkAuth()
  },
  mounted() {
    axios.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to
      // trigger. Do something with response data.
      this.checkAuth()
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
