<template>
  <main role="main" class="container-fluid">
    <b-modal id="demo-modal" title="Welcome to the Indie Adviser demo"
             size="lg">
      <demo-instructions />
    </b-modal>
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
import DemoInstructions from "@/components/LandingPage/DemoInstructions"

export default {
  name: "LandingPage",
  components: {Carousel, LandingSections, DemoInstructions},
  mounted() {
    this.$bvModal.show('demo-modal')
  }
}
</script>

<style scoped>

</style>
