/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth"
import axios from 'axios'
import apiCall from "@/utils/api"

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      apiCall({ url: "/api-token-auth/", data: user, method: "POST" })
        .then(resp => {
          localStorage.setItem("user-token", resp.data.token)
          axios.defaults.headers.common['Authorization'] = 'JWT ' +
            resp.data.token
          commit(AUTH_SUCCESS, resp)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem("user-token")
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem("user-token")
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success"
    state.hasLoadedOnce = true
    state.token = resp.data.token
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ""
    state.status = ""
    localStorage.removeItem('user-token')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}