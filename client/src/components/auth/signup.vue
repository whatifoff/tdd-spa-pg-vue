<template lang="html">
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                v-model="valid"
              >
                <v-text-field
                  v-model="email"
                  prepend-icon="person"
                  :rules="rulesEmail"
                  type="email"
                  label="E-mail"
                  name="email"
                  required
                  ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  v-model="password"
                  :rules="rulesPassword"
                  label="Password"
                  id="password"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="repeat"
                  name="passwordRep"
                  v-model="passwordRep"
                  :rules="rulesPasswordRep"
                  label="Password repeat"
                  id="passwordRep"
                  type="password"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="clickRegister"
                :disabled="!valid"
              >Register</v-btn>
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
      email: '',
      password: '',
      passwordRep: '',
      rulesEmail: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email is not valid'
      ],
      rulesPassword: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password length must be greater than 8 symbols'
      ],
      rulesPasswordRep: [
        v => !!v || 'Password repeat is required',
        v => v === this.password || 'Password repeat is not equal password'
      ]
    }
  },
  methods: {
    ...mapMutations([
      'setSnackbarText',
      'setSnackbar'
    ]),
    async clickRegister (e) {
      try {
        const response = await axios.post('http://localhost:3000/auth/reg', {
          email: this.email,
          password: this.password
        })

        switch (response.status) {
          case 200:
            this.setSnackbarText('Check your email for verify')
            this.setSnackbar(true)
            this.$router.push({
              name: 'welcome'
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
      } finally {}
    }
  }
}
</script>
