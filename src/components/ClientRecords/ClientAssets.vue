<template>
  <div class="col-md-6 font-weight-bold">
    <hr>
    <h1 class="text-secondary font-weight-bold">Client Holdings</h1>

    <div v-for="asset in holdings" :key="asset.attrs.symbol">
      <hr>
      <h4 class="font-weight-bold">{{asset.attrs.symbol}}</h4>
      <hr>

      <div class="row">
      <div class="col">
        <p>Currency: </p>
      </div>
      <div class="col">
        <p>{{asset.attrs.currency}}</p>
      </div>
      </div>

      <div class="row">
      <div class="col">
        <p>Category: </p>
      </div>
      <div class="col">
        <p>{{asset.attrs.assetCategory}}</p>
      </div>
      </div>

      <div class="row">
      <div class="col">
        <p>Description: </p>
      </div>
      <div class="col">
        <p>{{asset.attrs.description}}</p>
      </div>
      </div>

      <div class="row">
      <div class="col">
        <p>Position Size: </p>
      </div>
      <div class="col">
        <p>{{asset.attrs.position}}</p>
      </div>
      </div>

      <div class="row">
      <div class="col">
        <p>Market Price: </p>
      </div>
      <div class="col">
        <p>{{asset.attrs.markPrice | currency}}</p>
      </div>
      </div>

      <div class="row">
      <div class="col">
        <p>Valuation: </p>
      </div>
      <div class="col">
        <p>{{asset.attrs.positionValue | currency}}</p>
      </div>
      </div>

    </div>



    <hr>
    <p><a class="btn btn-lg btn-dark" href="#" role="button">View details &raquo;</a></p>

  </div>
</template>

<script>
export default {
  name: "ClientAssets.vue",
  props: {
    holdings: Array
  }
}
</script>

<style scoped>

</style>