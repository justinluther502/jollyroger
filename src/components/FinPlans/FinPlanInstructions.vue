<template>
  <div class="row">
    <div class="col col-lg-9">
      <h3 class="font-weight-bold">How do I use this tool?</h3>
      <p>
        Use this tool to help clients plan for their future. Help them
        understand if they are saving enough money to last through their
        retirements.
      </p>
      <h5>Ask Questions</h5>
      <p>
        Ask your clients about what they have saved already, and where their
        money is held, paying close attention to the tax status of each savings
        account. Ask them about their different sources of income, as well
        as their different expenses.
      </p>
      <h5>Think about the future</h5>
      <p>
        For each of these cashflow items, you can specify a time-period if the
        income or expense is not ongoing. You can also specify individual
        growth rates for each item.
      </p>
      <h5>Record everything</h5>
      <p>
        Record all the information you gather from your client into one of the
        four categories above. Make sure to input at least one of each tax-type
        of investment account (Taxable, Traditional, or Roth), or it won't
        work. This will be fixed soon.
      </p>
      <h3 class="font-weight-bold">How does the planner work?</h3>
      <p>
        The planner simulates each individual year of your client's financial
        life. Assets earn returns, Incomes come in, Expenses go out, Taxes are
        paid (under some highly simplified assumptions). Money left over after
        expenses is invested, prioritizing tax-advantaged accounts. Shortfalls
        are drawn down from existing investments, prioritizing taxable
        accounts.
      </p>
      <p>
        As it creates new portfolios, it will keep trying new weights,
        to maximize return and minimize risk. When finished, the optimizer will
        present a set of optimized portfolios. The portfolio set will span the
        spectrum of riskiness of the original assets.
      </p>
      <p>
        This tool should not be used to replace the measured judgment and skill
        of a registered investment adviser. Output should be considered as
        informational only, and should not be construed as investment advice,
        or a prediction of market performance.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinPlanInstructions.vue"
}
</script>

<style scoped>

</style>