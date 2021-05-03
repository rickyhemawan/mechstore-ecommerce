<template>
  <v-container class="pa-12">
    <v-form @submit.prevent="submit">
      <v-text-field
        v-model="name"
        type="name"
        label="Name"
        color="basil"
        required
      />
      <v-text-field
        v-model="email"
        type="email"
        label="E-mail"
        class="mb-4"
        required
      />

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
    name: '',
    email: '',
    showPassword: false,
    password: '',
  }),

  methods: {
    ...mapActions({
      register: 'user/register',
    }),
    submit() {
      const { name, email, password } = this
      this.register({ name, email, password })
    },
  },
}
</script>

<style></style>
