<template>
  <div class="row">
    <form>
      <div class="form-group">
        <label for="ss-name">Beneficiary Name</label>
        <input type="text" id="ss-name" class="form-control"
               v-model="name">
        <label for="benefit-amount">Benefit Starting Amount</label>
        <input type="number" id="benefit-amount" class="form-control"
               v-model="amount">
        <label for="start">Benefit Start Year</label>
        <input type="date" id="start" v-model="start_date">
      </div>
      <button class="btn btn-primary" v-on:click="pushSS">
        Add this Social Security benefit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "newSS.vue",
  data () {
    return {
      name: "",
      amount: 0,
      start_date: ""
    }
  },
  methods: {
    pushSS () {
      this.$emit('add-ss', this.$data)
    }
  }
}
</script>

<style scoped>

</style>