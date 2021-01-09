<template>
  <b-modal id="new-income-modal" title="Add New Employment Income" size="lg"
           @ok="pushIncome">
    <form>
      <div class="form-group">
        <label for="income-name">Income Name</label>
        <input type="text" id="income-name" class="form-control"
               v-model="name">
        <label for="inc-amount">Income Starting Amount</label>
        <input type="number" id="inc-amount" class="form-control"
               v-model="amount">
        <label for="start">Income Start Year</label>
        <input type="date" id="start" v-model="start_date">
        <label for="end">Income End Year</label>
        <input type="date" id="end" v-model="end_date">
        <label for="growth">Expected Income Annual Growth</label>
        <input type="number" id="growth" class="form-control"
               v-model="growth">
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "newIncome.vue",
  data () {
    return {
      name: "",
      amount: 0,
      start_date: "",
      end_date: "",
      growth: 0.0
    }
  },
  methods: {
    pushIncome () {
      this.$emit('add-income', this.$data)
    }
  }
}
</script>

<style scoped>

</style>