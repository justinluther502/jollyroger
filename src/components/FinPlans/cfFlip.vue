<template>
  <div>
    <b-nav pills fill>
      <b-nav-item class="nav-item">
        <a class="nav-link" v-on:click="$emit('page1')">
          Step 1: Define Household Cashflows</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link" @click="$emit('page2')">
          Step 2: Household Savings Chart</a>
      </b-nav-item>
      <b-nav-item class="nav-item">
        <a class="nav-link active">
          Step 3: Household Savings Flipbook</a>
      </b-nav-item>
    </b-nav>
    <div>
      <yearlist :years="years"/>
    </div>
    {{years}}
  </div>
</template>

<script>
import yearlist from "@/components/FinPlans/yearlist"

export default {
  name: "cfFlip.vue",
  components: {yearlist},
  props: {
    years: Object,
  }
}
</script>

<style scoped>

</style>