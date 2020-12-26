import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App.vue'
import accounting from 'accounting'
import axios from 'axios'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Chart from 'chart.js'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"
Vue.prototype.$appname = "Jolly Roger"
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + token

}

Chart.plugins.register(ChartDataLabels)
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

Vue.filter('currency', function (val) {
  return accounting.formatMoney(val)
})

Vue.filter('percentage', function (value, decimals) {
  if (!value) {
    value = 0
  }
  if (!decimals) {
    decimals = 0
  }
  value = value * 100
  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
  value = value + '%'
  return value
})

Vue.filter('round', function (value, decimals) {
  if (!value) {
    value = 0
  }
  if (!decimals) {
    decimals = 0
  }
  value = value.toFixed(decimals)
  return value
})
