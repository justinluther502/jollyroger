/* eslint-disable promise/param-names */
import {
  // SAVE_SESSION,
  ADD_PLANPATH,
  ADD_FRONTIER,
  ADD_PORTFOLIO,
  ADD_NOTES
} from "../actions/advice"

const state = {
  notes: {},
  frontier: {},
  efficient_portfolio: {},
  finplan: []
}

const getters = {
  sessionExists: state => state !== {
    notes: {},
    frontier: {},
    efficient_portfolio: {},
    finplan: []
  },
  storedfinplan: state => state.finplan,
  storedfrontier: state => state.frontier,
  storedportfolio: state => state.efficient_portfolio,
  storednotes: state => state.notes
}

// const actions = {
//   [SAVE_SESSION]: ({ commit }) => {
//     return new Promise((resolve, reject) => {
//       commit(SAVE_SESSION);
//       apiCall({ url: "/", data: state, method: "POST" })
//         .then(resp => {
//         })
//         .catch(err => {
//           commit(AUTH_ERROR, err)
//           localStorage.removeItem("user-token")
//           reject(err)
//         })
//     })
//   },
// }

const mutations = {
  [ADD_PLANPATH]: (state, planpath) => {
    state.finplan = planpath
  },
  [ADD_FRONTIER]: (state, frontier) => {
    state.frontier = frontier
  },
  [ADD_PORTFOLIO]: (state, portfolio) => {
    state.efficient_portfolio = portfolio
  },
  [ADD_NOTES]: (state, notes) => {
    state.notes = notes
  }
}

export default {
  state,
  getters,
  // actions,
  mutations
}