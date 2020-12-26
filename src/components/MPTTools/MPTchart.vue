<template>
  <div>
    <b-nav pills fill>
      <b-nav-item class="nav-item">
        <a class="nav-link" v-on:click="$emit('page1')">
          Step 1: Asset Weights</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link active">Step 2: Efficient Frontier</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link disabled">Step 3: Portfolio Pie Chart</a>
      </b-nav-item>
    </b-nav>
    <hr>
    <EfficientFrontier
        :chartdata=linechartdata
        :assetdata=individsdata
        :assetlabels=titles
        v-on:update-slice="showPortfolio($event)"
    >
    </EfficientFrontier>
    <hr>
    <div class="row justify-content-center">
      <button class="btn btn-outline-success" @click="saveFrontier">
        Save this efficient frontier to session
      </button>
    </div>
    <h3 class="font-weight-bold">
      How do I read this chart?
    </h3>
    <div class="row">
      <div class="col col-lg-9">
        <p>
          The horizontal axis is expected risk. Left is lower risk, right is
          higher risk. The vertical axis is expected return. So assets located
          to the top and left are more favorable investments than those on the
          bottom and right. At least from a expected risk/reward perspective.
        </p>
        <p>
          The grey dots are our original asset classes. The blue dots are the
          optimized portfolios that we just built. Notice that most/all of the
          blue dots lie above / to the left of the original grey dots. This
          means the optimizer worked, and we have found some diversified
          portfolios with superior risk/reward characteristics compared to our
          original assets.
        </p>
        <h3 class="font-weight-bold">What's next?</h3>
        <p>
          To proceed, click on one of the blue dots to view its composition as
          a pie chart. Or hit the back button to readjust your weight
          constraints.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EfficientFrontier from "@/components/MPTTools/EfficientFrontier"
import { ADD_FRONTIER } from "@/store/actions/advice"

export default {
  name: "MPTchart.vue",
  components: {EfficientFrontier},
  props: {
    linechartdata: Array,
    individsdata: Array,
    titles: Array,
  },
  methods: {
    showPortfolio(slice) {
      this.$emit('show-portfolio', slice)
    },
    backtoWeights() {
      this.$emit('page1')
    },
    saveFrontier() {
      this.$store.commit(ADD_FRONTIER, this.$props)
    }
  }
}
</script>

<style scoped>

</style>