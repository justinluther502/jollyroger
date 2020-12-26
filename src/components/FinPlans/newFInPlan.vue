<template>
  <main role="main" class="container">
    <div class="row">
      <div class="col">
        <h1 class="display-4 font-weight-bold">
          New Financial Plan</h1>
      </div>
    </div>

    <fin-plan-cards v-if="pageview==1"
                    :fp_inputs="fp_inputs"
                    :indices="list_indices"
                    v-on:chartdata="chart_data=$event"
                    v-on:chartoptions="chart_options=$event"
                    v-on:showchart="pageview=2"
                    v-on:inputs="fp_inputs=$event"
                    v-on:indices="list_indices=$event"
                    v-on:years="years=$event"
    />
    <cf-chart-container :chart_data="chart_data"
                        :chart_options="chart_options"
                        v-if="pageview==2"
                        v-on:page1="pageview=1"
                        v-on:page3="pageview=3"
    />
    <cf-flip v-if="pageview==3"
             :years="years"
             v-on:page2="pageview=2"
    />

  </main>
</template>

<script>
import cfChartContainer from "@/components/FinPlans/cfChartContainer"
import FinPlanCards from "@/components/FinPlans/FinPlanCards"
import cfFlip from "@/components/FinPlans/cfFlip"

export default {
  name: "newFInPlan.vue",
  components: {cfChartContainer, FinPlanCards, cfFlip},
  data() {
    return {
      chart_data: {},
      years: {},
      list_indices: {
        assets: 0,
        expenses: 0,
        incomes: 0,
        ss: 0
      },
      fp_inputs: {
        assets: {
          id: 0,
          name: "Current Assets",
          add_form_visible: false,
          description: "Add information on client current assets, taxable " +
              "status, valuations, etc.",
          list: {}
        },
        expenses: {
          id: 1,
          name: "Expenses",
          add_form_visible: false,
          description: "Add information on client expenses, including both " +
              "ongoing expenses as well as one-timers and temporary expenses " +
              "such as college tuition, etc.",
          list: {}
        },
        employment_incomes: {
          id: 2,
          name: "Employment Incomes",
          add_form_visible: false,
          description: "Add information on client income sources, excluding  " +
              "social security.",
          list: {}
        },
        ss_incomes: {
          id: 3,
          name: "Social Security Incomes",
          add_form_visible: false,
          description: "Add information on client social security " +
              "expectations, including spouse expectations.",
          list: {}
        }
      },
      pageview: 1,
      chart_options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>

<style scoped>

</style>