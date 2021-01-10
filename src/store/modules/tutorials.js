/* eslint-disable promise/param-names */
import {
  FIRST_VISIT_COMPLETE
} from "../actions/tutorials"

const state = {
  visited: localStorage.getItem("visited") || "first visit",
}

const getters = {
  visitStatus: state => state.visited
}

const mutations = {
  [FIRST_VISIT_COMPLETE]: (state) => {
    state.visited = "visited already"
  }
}

export default {
  state,
  getters,
  // actions,
  mutations
}