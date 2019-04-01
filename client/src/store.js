import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarText: '',
    auth: false,
    accessToken: null,
    refreshToken: null
  },
  getters: {
    getSnackbar (state) {
      return state.snackbar
    },
    getSnackbarText (state) {
      return state.snackbarText
    },
    getAuth (state) {
      return state.auth
    },
    getAccessToken (state) {
      return state.accessToken
    },
    getRefreshToken (state) {
      return state.refreshToken
    }
  },
  mutations: {
    setSnackbarText (state, text) {
      state.snackbarText = text
    },
    setSnackbar (state, status) {
      state.snackbar = status
      if (status === false) {
        state.snackbarText = ''
      }
    },
    setAuth (state, status) {
      state.auth = status
    },
    setAccessToken (state, token) {
      state.accessToken = token
    },
    setRefreshToken (state, token) {
      state.refreshToken = token
    }
  },
  actions: {

  }
})
