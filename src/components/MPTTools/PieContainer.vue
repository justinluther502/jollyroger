<template>
  <div>
    <b-nav pills fill>
      <b-nav-item class="nav-item">
        <a class="nav-link" v-on:click="$emit('page1')">
          Step 1: Asset Weights</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link" v-on:click="$emit('page2')">
          Step 2: Efficient Frontier</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link active">
          Step 3: Portfolio Pie Chart</a>
      </b-nav-item>
    </b-nav>
    <hr>

    <div class="row">
      <div class="col col-lg-5">
        <div class="row">
          <div class="col-5">
            <h4 class="font-weight-bold text-dark">Asset Class</h4>
          </div>
          <div class="col-5">
            <h4 class="font-weight-bold text-dark">Weight</h4>
          </div>
        </div>
        <div class="row border border-bottom border-bottom"
             v-for="(label, index) in labels" :key="label">
          <div class="col-5">
            {{label}}
          </div>
          <div class="col-5">
            {{weights[index] | percentage}}
          </div>
        </div>
        <br>
        <div class="row">
          <button class="btn btn-outline-success" @click="savePortfolio">
            Add this portfolio to advising session
          </button>
        </div>
      </div>
      <div class="col-7">
        <portfolio-pie :slice="slice"
                       :chartdata="chartdata"
        />
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import PortfolioPie from "@/components/MPTTools/PortfolioPie"
import {ADD_PORTFOLIO} from "@/store/actions/advice"

export default {
  name: "PieContainer.vue",
  components: {PortfolioPie},
  props: {
    chartdata: Object,
    slice: Number
  },
  data() {
    return {
      labels: [],
      weights: []
    }
  },
  methods: {
    savePortfolio() {
      this.$store.commit(ADD_PORTFOLIO, this.$props)
    }
  },
  mounted() {
    const data = this.chartdata
    delete data['labels']
    delete data['returns']
    delete data['risks']
    for (const key in data) {
      this.labels.push(key)
      this.weights.push(data[key][this.slice])
    }
  }
}
</script>

<style scoped>

</style>