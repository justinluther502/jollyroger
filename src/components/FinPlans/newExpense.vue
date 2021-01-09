<template>
  <b-modal id="new-expense-modal" title="Add New Expense" size="lg"
           @ok="pushExpense">
    <form>
      <div class="form-group">
        <label for="expense-name">Expense Name</label>
        <input type="text" id="expense-name" class="form-control"
               v-model="name">
        <label for="exp-amount">Expense Starting Amount</label>
        <input type="number" id="exp-amount" class="form-control"
               v-model="amount">
        <label for="start">Expense Start Year</label>
        <input type="date" id="start" v-model="start_date">
        <label for="end">Expense End Date</label>
        <input type="date" id="end" v-model="end_date">
        <label for="growth">Expected Expense Annual Growth</label>
        <input type="number" id="growth" class="form-control"
               v-model="growth">
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "newExpense.vue",
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
    pushExpense () {
      this.$emit('add-expense', this.$data)
    }
  }
}
</script>

<style scoped>

</style>