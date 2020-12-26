<template>
  <div>
    <b-nav pills fill>
      <b-nav-item class="nav-item">
        <a class="nav-link active" v-on:click="pageview=1">
          Step 1: Asset Weights</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link disabled">Step 2: Efficient Frontier</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link disabled">Step 3: Portfolio Pie Chart</a>
      </b-nav-item>
    </b-nav>
    <hr>
    <div class="form-group">
      <div class="form-row">
        <div class="col">
          <h3 class="font-weight-bold">Asset Class</h3>
        </div>
        <div class="col">
          <h3 class="font-weight-bold">Minimum Weight</h3>
        </div>
        <div class="col">
          <h3 class="font-weight-bold">Maximum Weight</h3>
        </div>
      </div>
      <div class="form-row">
        <div class="col">
          <label>Set global constraints:</label>
        </div>
        <div class="col">
          <input type="number" class="form-control border border-primary"
                 v-model="glob_min" @change="setGlobals">
        </div>
        <div class="col">
          <input type="number" class="form-control border border-primary"
                 v-model="glob_max" @change="setGlobals">
        </div>
      </div>
      <br>
      <div class="form-row" v-for="(title, index) in titles"
           v-bind:key="title.id">
        <div class="col">
          <label>{{ title }}</label>
        </div>
        <div class="col" :key="globmin_index">
          <input type="number" class="form-control" value="10"
                 v-model.number=mins[index]>
        </div>
        <div class="col" :key="globmax_index">
          <input type="number" class="form-control" value="100"
                 v-model.number=maxes[index]>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-10">
        <button
            class="btn btn-dark btn-lg btn-block font-weight-bold"
            v-on:click="runOpt">
          Run MPT Optimizer
        </button>
      </div>
      <div class="col-2">
        <div class="spinner-border text-primary" role="status" v-if="waiting">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <hr>
    <m-p-tinstructions/>
  </div>
</template>

<script>
import MPTinstructions from "@/components/MPTTools/MPTinstructions"

export default {
  name: "MPTinputs.vue",
  components: {MPTinstructions},
  data() {
    return {
      glob_min: 0,
      glob_max: 100,
      globmin_index: 0,
      globmax_index: 1000
    }
  },
  props: {
    titles: Array,
    mins: Array,
    maxes: Array,
    waiting: Boolean
  },
  methods: {
    runOpt() {
      this.$emit('update-mins', this.mins)
      this.$emit('update-maxes', this.maxes)
      this.$emit('run-opt')
    },
    setGlobals() {
      for (const i in this.mins) {
        this.mins[i] = this.glob_min
      }
      for (const j in this.maxes) {
        this.maxes[j] = this.glob_max
      }
      // incrementing index forces the individual constraint fields to visually
      // update as the user changes the global constraint.
      this.globmin_index++
      this.globmax_index++
    }
  }
}
</script>

<style scoped>

</style>