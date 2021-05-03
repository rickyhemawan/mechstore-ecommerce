<template>
  <div id="app">
    <the-navigation v-if="isAuthenticated()" />
    <router-view />
  </div>
</template>

<script>
import TheNavigation from './components/the-navigation.vue'
export default {
  methods: {
    isAuthenticated() {
      return typeof localStorage.access_token !== 'undefined'
    },
  },
  components: { TheNavigation },
}
</script>

<style>
body {
  font-family: 'Lato' !important;
}
</style>
