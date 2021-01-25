<template>
  <main class="container">
    <h1 class="display-4">Add / Edit Info for {{ $route.params.id }}</h1>
    <div class="row">
      <div class="col-6">
        <form @submit="updateClientData">
          <div class="form-group">
            <label>First Name</label>
            <input class="form-control" v-model="indieprofile.first_name">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input class="form-control" v-model="indieprofile.last_name">
          </div>
          <div class="form-group">
            <label>Birthday</label>
            <b-input class="form-control" type="date"
                     v-model="indieprofile.birthday"/>
          </div>
          <div class="form-group">
            <label>Expected Retirement Date</label>
            <b-input class="form-control" type="date"
                     v-model="indieprofile.retire_date"/>
          </div>
          <div class="form-group">
            <label>Marital Status</label>
            <b-form-radio-group v-model="indieprofile.marital_status"
                                :options="options"
                                name="radio-validation" label="Marital Status"/>
          </div>
          <div class="form-group">
            <label>Spouse First</label>
            <input class="form-control" v-model="indieprofile.spouse_first">
          </div>
          <div class="form-group">
            <label>Spouse Last</label>
            <input class="form-control" v-model="indieprofile.spouse_last">
          </div>
          <div class="form-group">
            <label>Current Job</label>
            <input class="form-control" v-model="indieprofile.current_job">
          </div>
          <div class="form-group">
            <label>Total Annual Income</label>
            <input class="form-control"
                   v-model="indieprofile.total_annual_income"
                   type="number" step="10000">
          </div>
          <div class="form-group">
            <label>Annual Benefits</label>
            <input class="form-control"
                   v-model="indieprofile.annual_benefits"
                   type="number" step="10000">
          </div>
          <div class="form-group">
            <label>Estimated Social Security</label>
            <input class="form-control"
                   v-model="indieprofile.ssa_quick_estimate"
                   type="number" step="10000">
          </div>
          <div class="form-group">
            <label>Short Term Income Growth</label>
            <input class="form-control"
                   v-model="indieprofile.short_growth"
                   type="number" step="0.01">
          </div>
          <div class="form-group">
            <label>Long Term Income Growth</label>
            <input class="form-control"
                   v-model="indieprofile.long_growth"
                   type="number" step="0.01">
          </div>
          <div class="form-group">
            <label>Benefits Notes</label>
            <b-form-textarea class="form-control"
                             v-model="indieprofile.benefits_notes" rows="6"/>
          </div>
          <div class="form-group">
            <label>Tax Notes</label>
            <b-form-textarea class="form-control"
                             v-model="indieprofile.income_taxation_notes"
                             rows="6"/>
          </div>
          <div class="form-group">
            <label>Family Notes</label>
            <b-form-textarea class="form-control"
                             v-model="indieprofile.family_notes"
                             rows="6"/>
          </div>


          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
    {{ indieprofile }}
  </main>
</template>

<script>
import apiCall from "@/utils/api"

export default {
  name: "EditClientProfile.vue",
  data() {
    return {
      indieprofile: {
        first_name: "",
        last_name: "",
        birthday: "",
        marital_status: "",
        spouse_first: "",
        spouse_last: "",
        total_annual_income: 0.0,
        short_growth: 0.0,
        long_growth: 0.0,
        annual_benefits: 0.0,
        benefits_notes: "",
        income_taxation_notes: "",
        ssa_quick_estimate: 0.0,
        retire_date: "",
        family_notes: "",
        current_job: ""
      },
      options: [
        {text: 'Single', value: 'SI'},
        {text: 'Married', value: 'MA'},
        {text: 'Divorced', value: 'DI'},
        {text: 'Other', value: 'OT'}
      ]
    }
  },
  created() {
    this.getIndieProfile()
  },
  methods: {
    getIndieProfile() {
      apiCall({
        url: "/API/clients/" + this.$route.params.id + "/",
        method: "GET"
      })
          .then(resp => {
            this.indieprofile = resp.data
          })
    },
    updateClientData() {
      console.log("updating client now...")
      this.indieprofile.ibID = this.$route.params.id
      if (this.indieprofile.id) {
        apiCall({
          url: "/API/clients/" + this.indieprofile.id + "/",
          method: "PUT",
          data: this.indieprofile
        })
            .then(resp => {
              console.log(resp)
              this.$router.push('/ClientList')
            })
      } else {
        console.log('posting new entry')
        apiCall({
          url: "/API/clients/",
          method: "POST",
          data: this.indieprofile
        })
            .then(resp => {
              console.log(resp)
              this.$router.push('/ClientList')
            })
      }
    }
  }
}
</script>

<style scoped>

</style>