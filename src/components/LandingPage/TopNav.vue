<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
    <b-navbar-brand to="/">{{ $appname }}</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Left aligned site nav items -->
      <site-nav-widget/>

      <!-- Right aligned admin nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/feedback">Demo Feedback</b-nav-item>
        <account-nav-widget/>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AccountNavWidget from "@/components/LandingPage/AccountNavWidget"
import SiteNavWidget from "@/components/LandingPage/SiteNavWidget"

export default {
  name: "TopNav",
  components: {AccountNavWidget, SiteNavWidget}
}
</script>

<style>

</style>
