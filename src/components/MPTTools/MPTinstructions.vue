<template>
  <div class="row">
    <div class="col col-lg-9">
      <h3 class="font-weight-bold">How do I use this tool?</h3>
      <p>
        Use this tool to help build diversified client portfolios.
        The optimizer will build <i>mean-risk efficient</i> portfolios.
      </p>
      <p>
        All you have to do is set asset weight constraints, if you want any,
        and then hit the button to start the optimizer. It will take 5 to 10
        seconds to run under normal conditions.
      </p>
      <p>
        This tool should not be used to replace the measured judgment and skill
        of a registered investment adviser. Output should be considered as
        informational only, and should not be construed as investment advice,
        or a prediction of market performance.
      </p>
      <h3 class="font-weight-bold">How does the optimizer work?</h3>
      <p>
        The optimizer will combine each of the above asset classes into weighted
        portfolios. It will measure the expected return and risk characteristics
        of the resulting weighted portfolios.
      </p>
      <p>
        As it creates new portfolios, it will keep trying new weights,
        to maximize return and minimize risk. When finished, the optimizer will
        present a set of optimized portfolios. The portfolio set will span the
        spectrum of riskiness of the original assets.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: `MPTinstructions.vue`
}
</script>

<style scoped>

</style>