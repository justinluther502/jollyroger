<template>
  <main role="main" class="container">
    <h1 class="display-4">Client List</h1>
    <transition name="slide-fade">
      <div class="list-group col-md-10" v-if="clientsLoaded">
        <router-link v-for="client in clients" :key="client.attrs.accountId"
                     :to="{ name: 'client-detail',
                     params: { id: client.attrs.accountId} }"
                     class="list-group-item list-group-item-action flex-column
         align-items-start active border-dark">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ client.AccountInformation.attrs.name }}</h5>
            <small>{{ client.AccountInformation.attrs.customerType }}</small>
          </div>
          <p class="mb-1">
            {{ client.AccountInformation.attrs.cityResidentialAddress }},
            {{ client.AccountInformation.attrs.stateResidentialAddress }}
          </p>
          <small>IBKR Account ID: {{ client.attrs.accountId }}</small>
        </router-link>
      </div>
    </transition>
  </main>
</template>

<script>
import apiCall from "@/utils/api";

export default {
  name: "ClientList",
  data() {
    return {
      reportKey: null,
      clients: null,
      clientsLoaded: false,
      ibkr_key: "",
      profile_loaded: false
    }
  },
  created() {
    //TODO: this is hacky, redo this with async later.
    this.getUserProfile()
    setTimeout(() => {
      this.getAllClients()
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
    getAllClients() {
      //todo: this is hardcoded to my ibkr flex token, should pull from auth.
      const query_url1 = process.env.VUE_APP_IB_FLEX_QUERY_PATH +
          this.ibkr_key + '&q=451386&v=3'
      var parseString = require('xml2js').parseString

      axios.get(query_url1)
          .then(response => {
            parseString(response.data, {attrkey: 'attrs', explicitArray: false},
                (err, result) => {
                  if (err) {
                    //Do something
                  } else {
                    this.reportKey = result['FlexStatementResponse'][
                        'ReferenceCode']
                  }
                }
            )

            const query_url2 = process.env.VUE_APP_IB_FLEX_STATEMENT_PATH +
                this.reportKey + '&t=' + this.ibkr_key + '&v=3'

            //short pause before 2nd request because ibkr xml returns 1019
            // error if we ask too fast after getting a ref code from
            // 1st request.
            setTimeout(() => {
              axios.get(query_url2)
                  .then(response => {
                    parseString(response.data, {
                          attrkey: 'attrs',
                          explicitArray: false
                        },
                        (err, result) => {
                          if (err) {
                            //Do something
                          } else {
                            this.clients = result['FlexQueryResponse'][
                                'FlexStatements']['FlexStatement']
                            this.clientsLoaded = true
                          }
                        }
                    )
                  })
            }, 200)
          })
    }
  }
}
import axios from 'axios'
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .6s ease;
}

.slide-fade-leave-active {
  transform: translateX(-300px);
  opacity: 0;
}

.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */
{
  transform: translateX(300px);
  opacity: 0;
}
</style>
