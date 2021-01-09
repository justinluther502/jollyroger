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
    <div class="card-deck">
      <div class="card shadow-lg" style="width: 18rem;"
           v-for="(input, cat_idx) in fp_inputs" :key="input.id">
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

    <br>
    <div class="row">
      <div class="col">
        <new-asset v-if="fp_inputs.assets.add_form_visible"
                   v-on:add-asset="updateCashflowList($event, 'assets')">
        </new-asset>
        <new-expense v-if="fp_inputs.expenses.add_form_visible"
                     v-on:add-expense="updateCashflowList($event, 'expenses')">
        </new-expense>
        <new-income v-if="fp_inputs.employment_incomes.add_form_visible"
                    v-on:add-income="updateCashflowList($event,
                'employment_incomes')">
        </new-income>
        <new-s-s v-if="fp_inputs.ss_incomes.add_form_visible"
                 v-on:add-ss="updateCashflowList($event, 'ss_incomes')">
        </new-s-s>
      </div>
    </div>
    <hr>

    <button class="btn btn-block btn-lg btn-dark" v-on:click="generateFinPlan">
      Generate Financial Plan
    </button>
    <br>
    <button v-on:click="dummyPlan">Debug Dummy Plan</button>
  </div>
</template>

<script>
import newAsset from "@/components/FinPlans/newAsset"
import newExpense from "@/components/FinPlans/newExpense"
import newIncome from "@/components/FinPlans/newIncome"
import newSS from "@/components/FinPlans/newSS"
import Trashcan from "@/components/Icons/Trashcan"
import axios from "axios"

export default {
  name: "FinPlanCards.vue",
  components: {newAsset, newExpense, newIncome, newSS, Trashcan},
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
      },
    }
  },
  methods: {
    // makes the correct form visible to input an instance of CF data.
    addCashflow(cashflowtype) {
      if (cashflowtype == 'Current Assets') {
        this.fp_inputs.assets.add_form_visible = true
        this.fp_inputs.expenses.add_form_visible = false
        this.fp_inputs.employment_incomes.add_form_visible = false
        this.fp_inputs.ss_incomes.add_form_visible = false
      }
      if (cashflowtype == 'Expenses') {
        this.fp_inputs.assets.add_form_visible = false
        this.fp_inputs.expenses.add_form_visible = true
        this.fp_inputs.employment_incomes.add_form_visible = false
        this.fp_inputs.ss_incomes.add_form_visible = false
      }
      if (cashflowtype == 'Employment Incomes') {
        this.fp_inputs.assets.add_form_visible = false
        this.fp_inputs.expenses.add_form_visible = false
        this.fp_inputs.employment_incomes.add_form_visible = true
        this.fp_inputs.ss_incomes.add_form_visible = false
      }
      if (cashflowtype == 'Social Security Incomes') {
        this.fp_inputs.assets.add_form_visible = false
        this.fp_inputs.expenses.add_form_visible = false
        this.fp_inputs.employment_incomes.add_form_visible = false
        this.fp_inputs.ss_incomes.add_form_visible = true
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
      this.fp_inputs[cf_type].add_form_visible = false
    },
    dummyPlan() {
      //this is just for quick filling in plan info while I'm working on the
      //cashflow chart. Delete later. Not for production.
      this.fp_inputs['assets'].list["Fidelity"] = {
        id: 0,
        name: "Fidelity",
        value: 100000,
        tax_type: "Taxable",
        asset_class: "Domestic IG Bonds",
        expected_return: 0.0
      }
      this.fp_inputs['assets'].list["JPM"] = {
        id: 1,
        name: "JPM",
        value: 1000,
        tax_type: "Roth",
        asset_class: "Domestic Stocks",
        expected_return: 0.0
      }
      this.fp_inputs['assets'].list["JPM Trad 401k"] = {
        id: 2,
        name: "JPM Trad 401k",
        value: 60000,
        tax_type: "Traditional",
        asset_class: "HY Bonds",
        expected_return: 0.0
      }
      this.indices.assets = this.indices.assets + 3

      this.fp_inputs['expenses'].list["Food"] = {
        id: 0,
        name: "Food",
        amount: 27000,
        start_date: "2020-01-01",
        end_date: "2100-01-01",
        growth: 0.02
      }
      this.fp_inputs['expenses'].list["Rent"] = {
        id: 1,
        name: "Rent",
        amount: 30000,
        start_date: "2020-01-01",
        end_date: "2100-01-01",
        growth: 0.03
      }
      this.fp_inputs['expenses'].list["Other"] = {
        id: 2,
        name: "Other",
        amount: 5000,
        start_date: "2020-01-01",
        end_date: "2100-01-01",
        growth: 0.02
      }
      this.indices.expenses = this.indices.expenses + 3

      this.fp_inputs['employment_incomes'].list["Work Income"] = {
        id: 0,
        name: "Work Income",
        amount: 100000,
        start_date: "2020-01-01",
        end_date: "2050-01-01",
        growth: 0.02
      }
      this.indices.incomes++

      this.fp_inputs['ss_incomes'].list["SS Benefit"] = {
        id: 0,
        name: "SS Benefit",
        amount: 30000,
        start_date: "2051-01-01"
      }
      this.indices.ss++

      this.$forceUpdate()
    },
    generateFinPlan() {
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