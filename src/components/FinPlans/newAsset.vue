<template>
  <b-modal id="new-asset-modal" title="Add New Asset" size="lg" @ok="pushAsset">
    <form>
      <div class="form-group">
        <label for="asset-name">Asset Name</label>
        <input type="text" id="asset-name" class="form-control"
               v-model="name">
        <label for="asset-value">Current Value</label>
        <input type="number" id="asset-value" class="form-control"
               v-model="value">
        <label for="asset-tax">Taxable Type</label>
        <select class="form-control" id="asset-tax" v-model="tax_type">
          <option>Taxable</option>
          <option>Roth</option>
          <option>Traditional</option>
          <option>Tax Free</option>
        </select>
        <label for="asset-class">Asset Class</label>
        <select class="form-control" id="asset-class" v-model="asset_class">
          <option>Domestic Stocks</option>
          <option>Domestic IG Bonds</option>
          <option>Commodities</option>
          <option>HY Bonds</option>
        </select>
        <label for="asset-return">Expected Return</label>
        <input type="number" id="asset-return" class="form-control"
               v-model="expected_return">
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  name: "newAsset.vue",
  data () {
    return {
      name: "",
      value: 0,
      tax_type: "",
      asset_class: "",
      expected_return: 0.0
    }
  },
  methods: {
    pushAsset () {
      this.$emit('add-asset', this.$data)
    }
  }
}
</script>

<style scoped>

</style>