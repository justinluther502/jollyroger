<template>
  <main role="main">
    <div class="spinner-border text-primary" role="status"
         v-if="!detailLoaded">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="jumbotron" v-if="detailLoaded">
      <div class="container" v-if="detailLoaded">
        <h1 class="display-3" v-if="detailLoaded">
          {{ clientdetail.name }}</h1>
        <p>IBKR ID: {{ clientdetail.accountId }}</p>
        <p>Client Type: {{ clientdetail.customerType }}</p>
        <p>Client Since: {{ clientdetail.dateOpened }}</p>
        <router-link class="btn btn-primary btn-lg"
                     :to="{ name: 'new-note',
                     params: { id: $route.params.id } }">
          <span class="d-none d-md-block">Record Client Interaction Notes &raquo;
          </span>
          <span class="d-md-none">Record Notes &raquo;</span>
        </router-link>
      </div>
    </div>

    <div class="container" v-if="detailLoaded">
      <div class="row">
        <client-profile :clientprofile="clientdetail"/>
        <client-assets :holdings="clientassets"/>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import ClientProfile from "@/components/ClientRecords/ClientProfile"
import ClientAssets from "@/components/ClientRecords/ClientAssets"
import apiCall from "@/utils/api"

export default {
  name: "ClientDetail",
  components: {
    ClientProfile,
    ClientAssets
  },
  data() {
    return {
      reportKey: null,
      clientdetail: null,
      clientassets: null,
      detailLoaded: false,
      endpoint: '',
      ibkr_key: '',
      profile_loaded: false
    }
  },
  created() {
    this.endpoint = process.env.VUE_APP_IB_FLEX_QUERY_PATH
    this.getUserProfile()
    setTimeout(() => {
      this.getClientDetails()
    }, 200)
  },
  methods: {
    getUserProfile() {
      apiCall({url: "/API/adviser/", method: "GET"})
          .then(resp => {
            this.first_name = resp.data.first_name
            this.last_name = resp.data.last_name
            this.email = resp.data.email
            this.userID = resp.data.id
            this.last_login = resp.data.last_login
            this.username = resp.data.username
            this.ibkr_key = resp.data.profile.ibkrToken
            this.profile_loaded = true
          })
          .catch(err => {
            console.log(err)
          })
    },
    getClientDetails() {
      var parseString = require('xml2js').parseString
      axios.get('mockClientDetails.xml')
          .then(response => {
            parseString(response.data, {
                  attrkey: 'attrs',
                  explicitArray: false
                },
                (err, result) => {
                  if (err) {
                    //Do something
                  } else {
                    this.clientdetail = result['FlexQueryResponse'][
                        'FlexStatements']['FlexStatement']

                    for (var i = 0; i < this.clientdetail.length; i++) {
                      if (this.clientdetail[i]['attrs'][
                          'accountId'] == this.$route.params.id) {
                        this.clientassets = this.clientdetail[i][
                            'OpenPositions']['OpenPosition']
                        this.clientdetail = this.clientdetail[i][
                            'AccountInformation']['attrs']
                      }
                    }
                    this.detailLoaded = true
                  }
                }
            )
          })
    }
  }
}
</script>

<style scoped>

</style>
