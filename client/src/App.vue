<template>
  <div id="app">
    <v-app id="inspire">
      <v-snackbar
      v-model="snackbar"
      :top="true"
      :vertical="true"
      data-testid="snackbar"
      >
        {{ getSnackbarText }}
        <v-btn
          color="pink"
          flat
          @click="setSnackbar(false)"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-toolbar>
        <v-toolbar-side-icon v-show="burger"></v-toolbar-side-icon>
        <router-link :to="{ name: 'welcome' }" class="title">
          <v-toolbar-title>Title</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            flat
            v-show="!getAuth"
            to="/auth/signin"
            data-testid="btn-reg-signin"
          >Sign In</v-btn>
          <v-btn
            flat
            v-show="!getAuth"
            to="/auth/signup"
            data-testid="btn-reg-signup"
          >Sign Up</v-btn>
          <v-btn
            flat
            v-show="getAuth"
            @click="clickLogout"
            data-testid="btn-reg-logout"
          >Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer color="indigo" app inset></v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      burger: false
    }
  },
  computed: {
    ...mapGetters([
      'getSnackbarText',
      'getSnackbar',
      'getAuth'
    ]),
    snackbar: {
      get () {
        return this.getSnackbar
      },
      set (status) {
        this.setSnackbar(status)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSnackbar',
      'setAuth',
      'setAccessToken',
      'setRefreshToken'
    ]),
    // TODO: сходить на сервер - удалить все token
    clickLogout (event) {
      this.setAuth(false)
      this.setAccessToken(null)
      this.setRefreshToken(null)
      this.$router.push({
        name: 'welcome'
      })
    }
  }
}
</script>

<style scoped>
.title {
  cursor: pointer;
  text-decoration: none;
  color: black;
}
</style>
