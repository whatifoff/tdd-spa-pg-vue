import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarText: '',
    auth: false
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
    }
  },
  actions: {

  }
})
