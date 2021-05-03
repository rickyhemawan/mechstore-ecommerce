<template>
  <v-container class="pa-12">
    <v-form @submit.prevent="submit">
      <v-text-field v-model="email" label="E-mail" class="mb-4" required />

      <v-text-field
        v-model="password"
        label="Password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>

      <v-btn type="submit" color="success" block> Submit </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    email: '',
    showPassword: false,
    password: '',
  }),

  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    submit() {
      const { email, password } = this
      this.login({ email, password })
    },
  },
}
</script>

<style></style>
