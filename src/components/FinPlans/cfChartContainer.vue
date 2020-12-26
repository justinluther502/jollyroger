<template>
  <div>
    <div class="row">
      <div class="col">
        <b-nav pills fill>
          <b-nav-item class="nav-item">
            <a class="nav-link" v-on:click="$emit('page1')">
              Step 1: Define Household Cashflows</a>
          </b-nav-item>
          <b-nav-item class="nav-item">
            <a class="nav-link active">Step 2: Household Savings Chart</a>
          </b-nav-item>
          <b-nav-item class="nav-item">
            <a class="nav-link" @click="$emit('page3')">
              Step 3: Household Savings Flipbook</a>
          </b-nav-item>
        </b-nav>
      </div>
    </div>
    <hr>
    <cf-chart :chart-data="chart_data"
              :options="chart_options"
    />
    <hr>
    <div class="row justify-content-center">
      <button class="btn btn-outline-success" @click="savePlan">
        Save this efficient frontier to current session
      </button>
    </div>
  </div>
</template>

<script>
import cfChart from "@/components/FinPlans/cfChart"
import { ADD_PLANPATH } from "@/store/actions/advice"

export default {
  name: "cfChartContainer.vue",
  components: {cfChart},
  props: {
    chart_options: Object,
    chart_data: Object
  },
  methods: {
    savePlan() {
      this.$store.commit(ADD_PLANPATH, this.chart_data.datasets)
    }
  }
}
</script>

<style scoped>

</style>