<template>
  <div>
    <p>
      Thanks for helping to improve Indie Adviser! Please keep a few things in
      mind while testing it out:
    </p>
    <ul>
      <li>
        Several of the pages require user authentication. Click "Sign In" at
        the top right of this screen to log in. There is a temporary set of
        dummy credentials with fake info listed at the bottom of the login
        page for testing purposes. If you are having problems viewing pages
        try signing out and logging back in.
      </li>
      <li>
        The search bar doesn't do anything yet.
      </li>
      <li>
        If you are an actual financial adviser that uses Interactive Brokers
        for brokerage and custodian services, you can create a temporary free
        testing account. Just attach your IBKR flex-web-query token to your
        Indie Adviser account during account creation.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DemoInstructions.vue"
}
</script>

<style scoped>

</style>