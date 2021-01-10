<template>
  <b-modal id="new-income-modal" title="Add New Employment Income" size="md"
           @ok="pushIncome">
    <b-form>
      <b-form-row>
        <b-form-group label="Income Name">
          <b-form-input type="text" v-model="name"/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Income Starting Amount">
          <b-form-input type="number" v-model.number="amount"/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Income Start Year" class="mr-2">
          <b-form-input type="date" v-model="start_date" />
        </b-form-group>
        <b-form-group label="Income End Year" class="mr-2">
          <b-form-input type="date" id="end" v-model="end_date" />
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Expected Annual Income Growth">
          <b-form-input type="number" v-model.number="growth" step="0.01"/>
        </b-form-group>
      </b-form-row>


    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "newIncome.vue",
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
    pushIncome() {
      this.$emit('add-income', this.$data)
    }
  }
}
</script>

<style scoped>

</style>