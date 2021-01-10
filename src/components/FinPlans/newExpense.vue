<template>
  <b-modal id="new-expense-modal" title="Add New Expense" size="md"
           @ok="pushExpense">
    <b-form>
      <b-form-row>
        <b-form-group label="Expense Name">
          <b-form-input type="text" v-model="name" required/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Expense Starting Amount">
          <b-form-input type="number" v-model.number="amount"/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Expense Start Year" class="mr-2">
          <b-form-input type="date" v-model="start_date"/>
        </b-form-group>
        <b-form-group label="Expense End Date" class="mr-2">
          <b-form-input type="date" v-model="end_date"/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Expected Expense Annual Growth">
          <b-form-input type="number" v-model.number="growth" step="0.01" />
        </b-form-group>
      </b-form-row>

    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "newExpense.vue",
  data() {
    return {
      name: "",
      amount: 0,
      start_date: "",
      end_date: "",
      growth: 0.0
    }
  },
  methods: {
    pushExpense() {
      this.$emit('add-expense', this.$data)
    }
  }
}
</script>

<style scoped>

</style>