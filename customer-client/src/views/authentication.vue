<template>
  <v-container
    fill-height
    fluid
    :style="`background-image: url(${require('../assets/mech-wallpaper.png')});`"
  >
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-card color="basil" width="50rem">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-3 basil--text">Welcome!</h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card color="basil" flat>
                <form-login />
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card color="basil" flat>
                <form-register />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormLogin from '../components/form-login.vue'
import FormRegister from '../components/form-register.vue'
export default {
  data: () => ({
    tab: 0,
    items: ['Login', 'Register'],
  }),
  components: { FormLogin, FormRegister },
}
</script>

<style></style>
