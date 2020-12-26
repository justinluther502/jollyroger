<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      <em v-if="isAuthenticated">My Account</em>
      <em v-else>Sign In</em>
    </template>
    <b-dropdown-item v-if="!isAuthenticated" to="/login">
      Sign In
    </b-dropdown-item>
    <b-dropdown-item v-for="selection in selections" :key="selection.id"
                     :to="selection.destination">
      {{ selection.title }}
    </b-dropdown-item>
    <b-dropdown-item v-on:click="signout" v-if="isAuthenticated">
      Sign Out
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {mapGetters} from 'vuex'
import {AUTH_LOGOUT} from "@/store/actions/auth"

export default {
  name: "AccountNavWidget.vue",
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'authStatus'
    ])
  },
  methods: {
    signout() {
      this.$store.dispatch(AUTH_LOGOUT)
          .then(() => {
            this.$router.push('/login')
          })
      console.log('logging out')
    }
  },
  data() {
    return {
      selections: {
        settings: {
          id: 3,
          title: "My Settings",
          destination: "/account",
          icon_component: "PaperDocSVG",
          show: true
        },
        homepage: {
          id: 4,
          title: "Back to Landing Page",
          destination: "/",
          icon_component: "homeSVG",
          show: true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>