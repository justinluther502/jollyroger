<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
    <b-navbar-brand to="/">{{ $appname }}</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Left aligned site nav items -->
      <site-nav-widget/>

      <!-- Right aligned admin nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-1 col-6" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">
            Search
          </b-button>
        </b-nav-form>
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
