<template>
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-action flex-column
       align-items-start border-primary shadow-lg"
       v-for="(year, idx) in years" :key="idx">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1 font-weight-bold">{{ idx }}</h5>
        <!--<small>3 days ago</small>-->
      </div>
      <p class="mb-1">
        In <i>{{ idx }}</i>, Client's household began the year with
        {{ year.accounts_begin.roth | currency }} in Roth savings,
        {{ year.accounts_begin.trad | currency }} in Traditional savings, and
        {{ year.accounts_begin.taxable | currency }} in Taxable savings.
        Cashflows for the year were:
      </p>
      <ul class="list-group col-6">
        <li class="list-group-item" v-for="(cf, cfkey) in year.cashflows"
            :key="cf">
          <span v-if="cf >= 0">{{ cfkey }}: {{ cf | currency }}</span>
          <span v-else class="text-danger">{{ cfkey }}: {{ cf | currency }}
          </span>
        </li>
      </ul>
      <br>
      <p>
        After the year's cash flow and investment returns/drawdowns, Client's
        household ended the year with
        {{ year.accounts_end.roth | currency }} in Roth savings,
        {{ year.accounts_end.trad | currency }} in Traditional savings, and
        {{ year.accounts_end.taxable | currency }} in Taxable savings.
      </p>
      <!--<small>Donec id elit non mi porta.</small>-->
    </a>
  </div>
</template>

<script>
export default {
  name: "yearlist.vue",
  props: {
    years: {},
  }
}
</script>

<style scoped>

</style>