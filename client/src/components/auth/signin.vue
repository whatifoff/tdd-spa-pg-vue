<template lang="html">
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                v-model="valid"
              >
                <v-text-field
                  prepend-icon="person"
                  name="email"
                  label="E-mail"
                  type="email"
                  required
                  :rules="rulesEmail"
                  v-model="email"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="passwordLogin"
                  type="password"
                  required
                  :rules="rulesPassword"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!valid"
                @click="clickLogin"
                :loading="loading"
              >Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      valid: false,
      loading: false,
      email: '',
      password: '',
      rulesEmail: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email is not valid'
      ],
      rulesPassword: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password length must be greater than 8 symbols'
      ]
    }
  },
  methods: {
    ...mapMutations([
      'setSnackbarText',
      'setSnackbar',
      'setAuth',
      'setAccessToken',
      'setRefreshToken'
    ]),
    async clickLogin (e) {

      this.loading = true

      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password
        })

        console.log('####', response)

        switch (response.status) {
          case 200:
            this.setAuth(true)
            this.setAccessToken(response.data.token)
            this.setRefreshToken(response.data.refreshToken)
            this.$router.push({
              name: 'home'
            })
            break
          case 500:
            this.setSnackbarText('Server error')
            this.setSnackbar(true)
            break
        }
      } catch (e) {
        this.setSnackbarText(e)
        this.setSnackbar(true)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
