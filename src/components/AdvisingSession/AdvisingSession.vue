<template>
  <main role="main" class="container">
    <h1 class="display-4 font-weight-bold">Advising Session Record</h1>

    <p class="text-danger" v-if="emptySession">
      Save some session data in client, portfolio, and cash planning sections
      to be able to view session data here.
    </p>

    <div class="row" v-if="storednotes.user">
      <h3 class="font-weight-bold">Advising Session with Client
        <router-link :to="{ name: 'client-detail',
                     params: { id: storednotes.user} }"
        >
          {{ storednotes.user }}
        </router-link>
      </h3>
    </div>

    <div class="row" v-if="storednotes.user">
      <div class="col">
        <p>
          On
          <span class="text-secondary font-weight-bold">{{ timestamp }}</span>,
          Adviser conducted an advising session with Client:
          <b>{{ storednotes.user }}.</b>
          The following is a record of what was discussed, including any
          analysis conducted in the portfolio selection process.
        </p>
      </div>
      <hr>
    </div>

    <div class="row" v-if="storednotes.user">
      <h3 class="font-weight-bold">Notes Recorded</h3>
    </div>
    <div class="row">
      <div class="col">
        {{ storednotes.notes }}
      </div>
      <hr>
    </div>

    <div v-if="storedfinplan !== undefined && storedfinplan.length !== 0">
      <div class="row">
        <h3 class="font-weight-bold">Household savings projections</h3>
      </div>
      <div class="row">
        <div class="col-lg" v-for="cf in storedfinplan" :key="cf.label">
          <h4 class="font-weight-bold d-flex justify-content-center">
            {{ cf.label }}
          </h4>
          <div class="row" v-for="point in cf.data" :key="point.x">
            <div class="col d-flex justify-content-center">
              {{ point.x }}
            </div>
            <div class="col d-flex justify-content-end">
              {{ point.y | currency }}
            </div>
          </div>
        </div>
        <hr>
      </div>
    </div>

    <div v-if="Object.keys(storedfrontier).length !== 0">
      <div class="row">
        <h3 class="font-weight-bold">Efficient Frontier Used</h3>
      </div>
      <div class="row">
        <div class="col">
          <h4 class="font-weight-bold d-flex justify-content-end">
            Security or Portfolio
          </h4>
        </div>
        <div class="col">
          <h4 class="font-weight-bold d-flex justify-content-end">Risk</h4>
        </div>
        <div class="col d-flex justify-content-end">
          <h4 class="font-weight-bold">Return</h4>
        </div>
      </div>
      <div class="row" v-for="(asset, idx) in storedfrontier.individsdata"
           :key="asset.x">
        <div class="col d-flex justify-content-end">
          {{ storedfrontier.titles[idx] }}
        </div>
        <div class="col d-flex justify-content-end">
          {{ asset.x | round(1) }}
        </div>
        <div class="col d-flex justify-content-end">
          {{ asset.y | round(1) }}
        </div>
      </div>
      <hr>

      <div class="row" v-for="(portfolio, idx) in storedfrontier.linechartdata"
           :key="portfolio.x">
        <div class="col d-flex justify-content-end">
          Optimized Portfolio {{ idx + 1 }}
        </div>
        <div class="col d-flex justify-content-end">
          {{ portfolio.x | round(1) }}
        </div>
        <div class="col d-flex justify-content-end">
          {{ portfolio.y | round(1) }}
        </div>
      </div>
      <hr>
    </div>

    <div v-if="Object.keys(storedportfolio).length !== 0 ">
      <div class="row">
        <h3 class="font-weight-bold">
          Efficient Portfolio Selected
        </h3>
      </div>
      <div class="row">
        <div class="col d-flex justify-content-end">
          <h4 class="font-weight-bold">Security</h4>
        </div>
        <div class="col d-flex justify-content-end">
          <h4 class="font-weight-bold">Allocation</h4>
        </div>
      </div>
      <div class="row" v-for="(security, idx) in storedportfolio.chartdata"
           :key="security.key">
        <div class="col d-flex justify-content-end">
          {{ idx }}
        </div>
        <div class="col d-flex justify-content-end">
          {{ security[storedportfolio.slice] | percentage(1) }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "AdvisingSession.vue",
  computed: {
    ...mapGetters([
      'storedfinplan',
      'storedfrontier',
      'storedportfolio',
      'storednotes'
    ]),
    emptySession() {
      var has_user = false
      if (this.storednotes.user) {
        has_user = true
      }
      var has_plan = false
      if (this.storedfinplan !== undefined && this.storedfinplan.length !== 0) {
        has_plan = true
      }
      var has_frontier = false
      if (Object.keys(this.storedfrontier).length !== 0) {
        has_frontier = true
      }
      var has_port = false
      if (Object.keys(this.storedportfolio).length !== 0) {
        has_port = true
      }
      if (!has_user && !has_plan && !has_frontier && !has_port) {
        return true
      }
      return false
    }
  },
  data() {
    return {
      timestamp: "",
    }
  },
  created() {
    this.getNow()
  },
  methods: {
    getNow: function () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' +
          today.getDate()
      const time = today.getHours() + ":" + today.getMinutes() + ":" +
          today.getSeconds()
      const dateTime = date + ' ' + time
      this.timestamp = dateTime
    }
  }
}
</script>

<style scoped>

</style>