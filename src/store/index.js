import Vue from "vue"
import Vuex from "vuex"
import auth from "./modules/auth"
import advice from "@/store/modules/advice"
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

const store = new Vuex.Store({
  modules: {
    auth,
    advice
  },
  strict: debug
})

export default store