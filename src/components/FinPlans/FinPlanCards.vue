<template>
  <div>
    <div class="row">
      <div class="col">
        <b-nav pills fill>
          <b-nav-item class="nav-item">
            <a class="nav-link active">
              Step 1: Define Household Cashflows</a>
          </b-nav-item>
          <b-nav-item class="nav-item">
            <a class="nav-link disabled">Step 2: Household Savings Chart</a>
          </b-nav-item>
          <b-nav-item class="nav-item">
            <a class="nav-link disabled">Step 3: Household Savings Flipbook</a>
          </b-nav-item>
        </b-nav>
      </div>
    </div>
    <hr>
    <div class="row" :key="added_item_count">
      <div class="col-md-6 col-lg-4 col-xl-3 py-2"
           v-for="(input, cat_idx) in fp_inputs" :key="input.id">
        <div class="card shadow-lg h-100">
          <div class="card-body">
            <h5 class="card-title">{{ input.name }}</h5>
            <p class="card-text">{{ input.description }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"
                v-for="(item, cf_idx) in input.list" :key="item.id">
              {{ item.name }}
              <button class="btn btn-outline-danger float-right"
                      @click="removeCF(cat_idx, cf_idx)"
              >
                <trashcan class="text-danger"/>
              </button>
            </li>
          </ul>
          <div class="card-footer">
            <button class="btn btn-secondary btn-block"
                    v-on:click="addCashflow(input.name)">
              Add New
            </button>
          </div>
        </div>
      </div>
    </div>

    <br>
    <div class="row">
      <div class="col">
        <new-asset v-on:add-asset="updateCashflowList($event, 'assets')"/>
        <new-expense v-on:add-expense="updateCashflowList($event, 'expenses')">
        </new-expense>
        <new-income v-on:add-income="updateCashflowList($event,
        'employment_incomes')"/>
        <new-s-s v-on:add-ss="updateCashflowList($event, 'ss_incomes')"/>
      </div>
    </div>
    <button class="btn btn-block btn-lg btn-dark" v-on:click="generateFinPlan">
      Generate Financial Plan
    </button>
    <hr>
    <fin-plan-instructions />
  </div>
</template>

<script>
import newAsset from "@/components/FinPlans/newAsset"
import newExpense from "@/components/FinPlans/newExpense"
import newIncome from "@/components/FinPlans/newIncome"
import newSS from "@/components/FinPlans/newSS"
import Trashcan from "@/components/Icons/Trashcan"
import FinPlanInstructions from "@/components/FinPlans/FinPlanInstructions"
import axios from "axios"

export default {
  name: "FinPlanCards.vue",
  components: {newAsset, newExpense, newIncome, newSS, Trashcan,
    FinPlanInstructions},
  props: {
    fp_inputs: Object,
    indices: Object
  },
  data() {
    return {
      api_endpoint: process.env.VUE_APP_FINPLAN_PATH,
      years: {},
      chart_data: {},
      chart_options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    added_item_count() {
      return this.indices.assets + this.indices.expenses + this.indices.incomes
          + this.indices.ss
    }
  },
  methods: {
    // makes the correct form visible to input an instance of CF data.
    addCashflow(cashflowtype) {
      if (cashflowtype == 'Current Assets') {
        this.$bvModal.show('new-asset-modal')
      }
      if (cashflowtype == 'Expenses') {
        this.$bvModal.show('new-expense-modal')
      }
      if (cashflowtype == 'Employment Incomes') {
        this.$bvModal.show('new-income-modal')
      }
      if (cashflowtype == 'Social Security Incomes') {
        this.$bvModal.show('new-ss-modal')
      }
    },
    // push the filled-out form for the cashflow to the DOM.
    updateCashflowList(event, cf_type) {
      var newname = event["name"]
      this.fp_inputs[cf_type].list[newname] = event

      if (cf_type == 'assets') {
        this.fp_inputs[cf_type].list[newname].id = this.indices.assets
        this.indices.assets++
      }
      if (cf_type == 'expenses') {
        this.fp_inputs[cf_type].list[newname].id = this.indices.expenses
        this.indices.expenses++
      }
      if (cf_type == 'employment_incomes') {
        this.fp_inputs[cf_type].list[newname].id = this.indices.incomes
        this.indices.incomes++
      }
      if (cf_type == 'ss_incomes') {
        this.fp_inputs[cf_type].list[newname].id = this.indices.ss
        this.indices.ss++
      }
    },
    generateFinPlan() {
      var asset_types = []
      for (var asset in this.fp_inputs.assets.list) {
        asset_types.push(this.fp_inputs.assets.list[asset].tax_type)
      }
      const has_trad = asset_types.includes('Traditional')
      const has_roth = asset_types.includes('Roth')
      const has_tax = asset_types.includes('Taxable')

      if (!(has_trad && has_roth && has_tax)) {
        this.$bvToast.toast('Sorry, right now this only works if you input' +
            ' all 3 taxable types of current investments.', {
          title: 'Incomplete Asset List',
          autoHideDelay: 3000,
          toaster: 'b-toaster-top-center',
          variant: 'danger'
        })
      } else {
        axios.post(this.api_endpoint, this.$props)
            .then(response => {
              this.annualLog = response.data.chart
              this.years = response.data
              delete this.years['chart']
              this.taxable = this.annualLog.taxable
              this.roth = this.annualLog.roth
              this.trad = this.annualLog.trad
              this.chart_data = {
                datasets: [
                  {
                    label: 'Taxable Savings',
                    data: this.taxable,
                    fill: false,
                    borderColor: 'blue',
                    showLine: true
                  },
                  {
                    label: 'Roth Savings',
                    data: this.roth,
                    fill: false,
                    borderColor: 'green',
                    showLine: true
                  },
                  {
                    label: 'Traditional Savings',
                    data: this.trad,
                    fill: false,
                    borderColor: 'red',
                    showLine: true
                  }
                ]
              }
              this.chart_options = {
                responsive: true,
                maintainAspectRatio: false,
                datalabels: false,
                title: {
                  display: true,
                  text: 'Savings Projections'
                },
              }
              this.$emit('chartdata', this.chart_data)
              this.$emit('chartoptions', this.chart_options)
              this.$emit('inputs', this.fp_inputs)
              this.$emit('indices', this.indices)
              this.$emit('years', this.years)
              this.$emit('showchart')
            })
      }
    },
    removeCF(category, name) {
      delete this.fp_inputs[category].list[name]
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.card-title {
  font-weight: bold;
}
</style>