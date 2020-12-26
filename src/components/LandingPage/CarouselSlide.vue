<template>
  <b-carousel-slide style="background-color: #5a5a5a">
    <template v-slot:img>
      <img
          class="d-block class-name"
          width="1024"
          :src="require(`@/assets/${photo}`)"
          alt="image slot">
    </template>
    <div>
      <div class="container">
        <div class="carousel-caption text-left">

          <h1 class="display-1" v-if="bigtitle">{{ title }}</h1>
          <h1 class="display-4" v-else>{{ title }}</h1>

          <p>{{ slidetext }}</p>
          <p>
            <router-link class="btn btn-lg btn-primary" to="/">
              Show me the demo video >>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </b-carousel-slide>
</template>

<script>
export default {
  name: "CarouselSlide.vue",
  props: {
    photo: String,
    slidetext: String,
    title: String,
    bigtitle: Boolean
  }
}
</script>

<style scoped>
img {
  display: block;
  max-width: 35%;
  height: auto;
}

.carousel-item {
  height: 32rem;
  background-color: #777;
}


.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}

</style>