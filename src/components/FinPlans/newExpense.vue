<template>
  <div class="row">
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
      <button class="btn btn-primary" v-on:click="pushExpense">
        Add this expense
      </button>
    </form>
  </div>
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