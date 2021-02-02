<template>
  <main role="main" class="container-fluid">
    <b-modal id="demo-modal" title="Welcome to the Indie Adviser demo"
             size="lg" @ok="logFirstVisit">
      <demo-instructions />
    </b-modal>
    <carousel/>
    <hr>
    <landing-sections/>
    <footer class="container">
      <p>© Indie Adviser LLC 2017-2021</p>
    </footer>
  </main>
</template>

<script>
import Carousel from "@/components/LandingPage/Carousel"
import LandingSections from "@/components/LandingPage/LandingSections"
import DemoInstructions from "@/components/LandingPage/DemoInstructions"
import {FIRST_VISIT_COMPLETE} from "@/store/actions/tutorials"
import {mapGetters} from 'vuex'

export default {
  name: "LandingPage",
  components: {Carousel, LandingSections, DemoInstructions},
  computed: {
    ...mapGetters([
        'visitStatus'
    ])
  },
  mounted() {
    if (this.visitStatus != 'visited already') {
      this.$bvModal.show('demo-modal')
    }
  },
  methods: {
    logFirstVisit() {
      this.$store.commit(FIRST_VISIT_COMPLETE)
    }
  }
}
</script>

<style scoped>

</style>
