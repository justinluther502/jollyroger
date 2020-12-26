<template>
  <div class="col-md-6 font-weight-bold">
    <hr>
    <h1 class="text-secondary font-weight-bold">
      Client Profile Information</h1>

    <hr>
    <h4 class="font-weight-bold">Biography</h4>
    <hr>


    <div class="row">
      <div class="col">
        <p>Name: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.name}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Birthday: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.birthday}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Client Since: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.dateOpened}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Marital Status: </p>
      </div>
      <div class="col">
        <p>{{parseMaritalStatus(clientprofile.marital_status)}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Spouse First: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.spouse_first}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Spouse Last: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.spouse_last}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Expected Retirement Date: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.retire_date}}</p>
      </div>
    </div>

    <hr>
    <h4 class="font-weight-bold">Financials</h4>
    <hr>

    <div class="row">
      <div class="col">
        <p>Employment Income: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.total_annual_income | currency}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Annual Benefits: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.annual_benefits | currency}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Short Term Income Growth Expectation: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.short_growth | percentage}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Long Term Income Growth Expectation: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.long_growth | percentage}}</p>
      </div>
    </div>

    <hr>
    <h4 class="font-weight-bold">Notes</h4>
    <hr>

    <div class="row">
      <div class="col">
        <p>Income Taxation Notes: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.income_taxation_notes}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Benefits Notes: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.benefits_notes}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>Family Notes: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.family_notes}}</p>
      </div>
    </div>

    <hr>
    <h4 class="font-weight-bold">Mailing Address</h4>
    <hr>

    <div class="row">
      <div class="col">
        <p>Street 1: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.street}}</p>
      </div>
    </div>

    <div class="row" v-if="(clientprofile.street2 != '')">
      <div class="col">
        <p>Street 2: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.street2}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>City/State/Zip: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.city}}, {{clientprofile.state}}
          {{clientprofile.postalCode}}</p>
      </div>
    </div>

    <hr>
    <h4 class="font-weight-bold">Residential Address</h4>
    <hr>

    <div class="row">
      <div class="col">
        <p>Street 1: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.streetResidentialAddress}}</p>
      </div>
    </div>

    <div class="row" v-if="(clientprofile.street2ResidentialAddress != '')">
      <div class="col">
        <p>Street 2: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.street2ResidentialAddress}}</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <p>City/State/Zip: </p>
      </div>
      <div class="col">
        <p>{{clientprofile.cityResidentialAddress}},
          {{clientprofile.stateResidentialAddress}}
          {{clientprofile.postalCodeResidentialAddress}}</p>
      </div>
    </div>

    <hr>

    <p>
      <a class="btn btn-lg btn-dark" href="#" role="button">
        View details &raquo;
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: "ClientProfile.vue",
  props: {
    clientprofile: Object
  },
  methods: {
    parseMaritalStatus(statuscode) {
      switch (statuscode) {
        case 'SI': return 'Single'
        case 'MA': return 'Married'
        case 'DI': return 'Divorced'
        case 'OT': return 'Other'
        default: return 'Unknown'
      }
    },
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>