<template>
  <main role="main" class="container-fluid">
    <carousel/>
    <hr>
    <landing-sections/>
    <footer class="container">
      <p>© Luther Wealth Management 2017-2021</p>
    </footer>
  </main>
</template>

<script>
import Carousel from "@/components/LandingPage/Carousel"
import LandingSections from "@/components/LandingPage/LandingSections"

export default {
  name: "LandingPage",
  components: {Carousel, LandingSections}
}
</script>

<style scoped>

</style>
