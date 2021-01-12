<template>
  <b-carousel-slide style="background-color: #5a5a5a">
    <template v-slot:img>
      <img
          class="d-none d-md-block"
          :src="require(`@/assets/${photo}`)"
          alt="image slot">
      <img
          class="d-md-none"
          :src="require(`@/assets/${portrait}`)"
          alt="image slot">
    </template>
    <div>
      <div class="container">
        <div class="carousel-caption text-left">

          <span v-if="bigtitle">
          <h1 class="display-1 d-none d-md-block">
            {{ title }}</h1>
          <h1 class="display-3 d-md-none">
            {{ title }}</h1>
          </span>

          <span v-else>
            <h1 class="d-none d-md-block">{{ title }}</h1>
            <h1 class="d-md-none">{{ tinytitle }}</h1>
          </span>

          <p class="d-none d-md-block">{{ slidetext }}</p>
          <p class="d-md-none">{{ shorttext }}</p>
          <b-button v-b-modal="title" variant="primary"
                    class="font-weight-bold">
            <span class="d-none d-md-block">Show me the demo video >></span>
            <span class="d-md-none">Demo video >></span>
          </b-button>
          <b-modal :id="title" centered title="Indie Adviser Demo" size="xl"
                   header-bg-variant="dark"
                   header-text-variant="light"
                   body-bg-variant="dark"
                   body-text-variant="light"
                   footer-bg-variant="dark"
                   footer-text-variant="light">
            <div>
              <b-embed
                  type="iframe"
                  aspect="16by9"
                  src="https://www.youtube.com/embed/HHgs3KZu00k"
                  allowfullscreen
              ></b-embed>
            </div>
          </b-modal>
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
    portrait: String,
    slidetext: String,
    shorttext: String,
    title: String,
    tinytitle: String,
    bigtitle: Boolean
  }
}
</script>

<style scoped>
img {
  display: block;
  height: 32rem;
}

.carousel-item {
  height: 32rem;
  background-color: #777;
}

.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}
</style>