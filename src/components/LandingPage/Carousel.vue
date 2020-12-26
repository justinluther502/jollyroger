<template>
  <div>
    <b-carousel
        id="carousel-1"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="400"
        style="text-shadow: 1px 1px 2px #333;"
    >

      <carousel-slide v-for="slide in slides"
                      :key="slide.id"
                      :title="slide.title"
                      :photo="slide.photo"
                      :slidetext="slide.slidetext"
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
          photo: "panorama-city.jpg",
          slidetext: this.$appname + " is a toolkit for independent " +
              "financial advisers. Spend less time wrestling with back " +
              "office functions, and more time taking care of clients.",
          bigtitle: true
        },
        bigbroker: {
          id: 1,
          title: "You Don't Need a Big Brokerage House",
          photo: 'business-suit.jpg',
          slidetext: this.$appname + ' is designed to help financial advisers' +
              'break away from large financial institutions without ' +
              'sacrificing modern analytics and client management tools.',
          bigtitle: false
        },
        custodian: {
          id: 2,
          title: "Link Directly to Your Preferred Custodian",
          photo: 'businessman-tablet.jpg',
          slidetext: 'Currently we can link directly to client account info ' +
              'for advisers using Interactive Brokers as their custodian ' +
              'bank / brokerage firm, but we will be adding other brokerage ' +
              'backends soon.',
          bigtitle: false
        },
        mpt: {
          id: 3,
          title: 'Modern Portfolio Theory Optimization',
          photo: 'business-lady.jpg',
          slidetext: 'Our portfolio optimization algorithm solves many ' +
              'classic problems in portfolio theory. We can handle ' +
              'non-normal returns, dynamic correlations, and other ' +
              'well-known pitfalls of traditional optimization. Give your ' +
              'clients the reassurance that your decisions have a solid ' +
              'basis in cutting-edge investment theory.',
          bigtitle: false
        }
      }
    }
  }
}
</script>

<style scoped>
body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

b-carousel {
  margin-bottom: 4rem;
}
</style>