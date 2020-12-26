<template>
  <main role="main" class="container">
    <div class="row">
      <div class="col">
        <h1 class="display-4 text-dark font-weight-bold" v-if="isBasic">
          Basic MPT Optimization
        </h1>
        <h1 class="display-4 text-dark font-weight-bold" v-else>
          Advanced MPT Optimization
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <m-p-tinputs v-if="pageview == 1"
                     :titles="titles"
                     :mins="mins"
                     :maxes="maxes"
                     v-on:update-mins="mins = $event"
                     v-on:update-maxes="maxes = $event"
                     v-on:run-opt="runOptimizer"
                     :waiting="waiting"
        />

        <m-p-tchart v-if="pageview == 2"
                    :linechartdata="linechartdata"
                    :individsdata="individsdata"
                    :titles="titles"
                    v-on:show-portfolio="showPortfolio($event)"
                    v-on:page1="pageview=1"
        />

        <pie-container v-if="pageview == 3"
                       :slice="slice"
                       :chartdata="chartdata"
                       v-on:page2="pageview=2"
                       v-on:page1="pageview=1"

        />
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import MPTinputs from "@/components/MPTTools/MPTinputs"
import MPTchart from "@/components/MPTTools/MPTchart"
import PieContainer from "@/components/MPTTools/PieContainer";

export default {
  name: "mpt-page",
  components: {MPTinputs, MPTchart, PieContainer},
  props: {mpt_type: String},
  data() {
    return {
      pageview: 0,
      assets: null,
      titles: null,
      rets: [],
      point_clicked: 0,
      stdevs: [],
      mins: [],
      maxes: [],
      endpoint: '',
      MPTendpoint: "",
      chartdata: {},
      slice: 0,
      waiting: false
    }
  },
  computed: {
    isBasic: function () {
      if (this.mpt_type == 'basic') {
        return true
      }
      return false
    },
    // copied this from Stack Exchange, don't understand it but checks
    // if we have receieved data for charting yet.
    chartdataexists: function () {
      for (var key in this.chartdata) {
        if (this.chartdata.hasOwnProperty(key))
          return true;
      }
      return false;
    },

    // takes the returns and risks from chartdata received from optimizer
    // and packages it nicely into an x:y format for chart-js to use.
    // output is an array of the format:
    // [ {x: risk1, y: return1}, ...]
    linechartdata: function () {
      var datapoints = []
      for (var i = 0; i < this.chartdata["returns"].length; i++) {
        var point = {
          x: this.chartdata["risks"][i],
          y: this.chartdata["returns"][i]
        }
        datapoints.push(point)
      }
      return datapoints
    },
    individsdata: function () {
      var datapoints = []
      for (var i = 0; i < this.rets.length; i++) {
        var point = {
          x: this.stdevs[i],
          y: this.rets[i]
        }
        datapoints.push(point)
      }
      return datapoints

    }
  },
  created() {
    if (this.mpt_type == "basic") {
      this.endpoint = process.env.VUE_APP_BASICMPT_PATH + 'returns/'
      this.MPTendpoint = process.env.VUE_APP_BASICMPT_PATH + 'calculation/'
      this.getBasicData()
    }
    if (this.mpt_type == "advanced") {
      this.endpoint = process.env.VUE_APP_ADVMPT_PATH + 'returns/'
      this.MPTendpoint = process.env.VUE_APP_ADVMPT_PATH + 'calculation/'
      this.getAdvData()
    }
  },
  methods: {

    // AJAX request to backend to get the titles and return data of
    // individual assets. Used for Advanced MPT where joint return is pre-
    // calculated.
    // also populates form with default values although this should
    // be refactored in a cleaner way later.
    getAdvData() {
      axios.get(this.endpoint)
          .then(response => {
            this.assets = response.data
            this.titles = this.assets["Titles"]
            this.rets = this.assets["Avg Returns"]
            this.rets = Object.values(this.rets)
            this.stdevs = this.assets["Std Devs"]
            this.stdevs = Object.values(this.stdevs)
            //this next part should be separated from "get assets"
            let numAssets = this.titles.length
            for (var i = 0; i < numAssets; i++) {
              this.mins[i] = 0
              this.maxes[i] = 100
            }
            this.pageview = 1
          })
    },

    // AJAX request to backend to get the titles and return data of
    // individual assets. Used for Basic MPT where joint return will be
    // calculated by backend.
    // also populates form with default values although this should
    // be refactored in a cleaner way later.
    getBasicData() {
      axios.get(this.endpoint)
          .then(response => {
            this.assets = response.data
            this.titles = this.assets["Unnamed: 0"]
            this.titles = Object.values(this.titles)
            this.rets = this.assets["Avg Returns"]
            this.rets = Object.values(this.rets)
            this.stdevs = this.assets["Std Devs"]
            this.stdevs = Object.values(this.stdevs)

            //this next part should be separated from "get assets"
            var i
            let numAssets = this.titles.length
            for (i = 0; i < numAssets; i++) {
              this.mins[i] = 0
              this.maxes[i] = 100
            }
            this.pageview = 1
          })
    },

    // AJAX request to backend to run the optimizer given a set of asset
    // weight constraints.
    runOptimizer() {
      this.waiting = true
      var constraints = {}
      constraints["mins"] = this.mins
      constraints["maxes"] = this.maxes
      axios.post(this.MPTendpoint, constraints)
          .then(response => {
            this.chartdata = response.data
            this.waiting = false
            this.pageview = 2
          })
    },
    showPortfolio(slice) {
      this.slice = slice
      this.pageview = 3
    }
  }
}
</script>

<style scoped>

</style>