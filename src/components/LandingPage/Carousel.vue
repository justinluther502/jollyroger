<template>
  <div>
    <b-carousel
        id="carousel-1"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-height="100"
        style="text-shadow: 1px 1px 2px #333;"
    >

      <carousel-slide v-for="slide in slides"
                      :key="slide.id"
                      :title="slide.title"
                      :photo="slide.photo"
                      :portrait="slide.portrait"
                      :slidetext="slide.slidetext"
                      :shorttext="slide.shorttext"
                      :bigtitle="slide.bigtitle"
      />

    </b-carousel>
  </div>
</template>


<script>
import CarouselSlide from "@/components/LandingPage/CarouselSlide"

export default {
  name: "Carousel.vue",
  components: {CarouselSlide},
  data() {
    return {
      slides: {
        intro: {
          id: 0,
          title: this.$appname,
          tinytitle: this.$appname,
          photo: "panorama-city.jpg",
          portrait: "panorama-city-portrait.jpg",
          slidetext: this.$appname + " is a toolkit for independent " +
              "financial advisers. Spend less time wrestling with back " +
              "office functions, and more time taking care of clients.",
          shorttext: this.$appname + " is a toolkit for independent " +
              "financial advisers.",
          bigtitle: true
        },
        bigbroker: {
          id: 1,
          title: "Do This Yourself",
          tinytitle: "Do This Yourself",
          photo: 'business-suit.jpg',
          portrait: "business-man-portrait.jpg",
          slidetext: this.$appname + ' is designed to help financial ' +
              'advisers break away from large financial institutions without ' +
              'sacrificing modern analytics and client management tools.',
          shorttext: this.$appname + ' is designed to help financial advisers' +
              ' break away from large financial institutions.',
          bigtitle: false
        },
        custodian: {
          id: 2,
          title: "Pick Your Custodian",
          tinytitle: "Pick Your Custodian",
          photo: 'businessman-tablet.jpg',
          portrait: 'building-portrait.jpg',
          slidetext: 'Currently we can link directly to client account info ' +
              'for advisers using Interactive Brokers as their custodian ' +
              'bank / brokerage firm, but we will be adding other brokerage ' +
              'backends soon.',
          shorttext: 'Currently we can link directly to client account info ' +
              'for advisers using Interactive Brokers.',
          bigtitle: false
        },
        mpt: {
          id: 3,
          title: 'Portfolio Optimization',
          tinytitle: "Portfolio Tools",
          photo: 'business-lady.jpg',
          portrait: 'business-lady-portrait.jpg',
          slidetext: 'Our portfolio optimization algorithm solves many ' +
              'classic problems in portfolio theory. We can handle ' +
              'non-normal returns, dynamic correlations, and other ' +
              'well-known pitfalls of traditional optimization. Give your ' +
              'clients the reassurance that your decisions have a solid ' +
              'basis in cutting-edge investment theory.',
          shorttext: 'Our portfolio optimization algorithm solves many ' +
              'classic problems in portfolio theory.',
          bigtitle: false
        }
      }
    }
  }
}
</script>

<style scoped>
b-carousel {
  margin-bottom: 4rem;
  height: 32rem;
}
</style>