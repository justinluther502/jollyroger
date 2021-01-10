<template>
  <b-modal id="new-ss-modal" title="Add New Social Security Income" size="md"
           @ok="pushSS">
    <b-form>
      <b-form-row>
        <b-form-group label="Beneficiary Name">
          <b-input type="text" v-model="name"/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Benefit Starting Amount">
          <b-input type="number" v-model.number="amount"/>
        </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Benefits Start Year">
          <b-input type="date" v-model="start_date"/>
        </b-form-group>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: "newSS.vue",
  data() {
    return {
      name: "",
      amount: 0,
      start_date: ""
    }
  },
  methods: {
    pushSS() {
      const item_data = Object.assign({}, this.$data)
      this.$emit('add-ss', item_data)
      this.name = ""
      this.amount = 0
      this.start_date = ""
    }
  }
}
</script>

<style scoped>

</style>