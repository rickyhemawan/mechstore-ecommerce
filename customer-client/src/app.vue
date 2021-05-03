<template>
  <v-app>
    <the-navigation :isAuthenticated="isAuthenticated()" />
    <v-main>
      <router-view />
      <fab-cart v-if="showCart()" />
      <the-overlay />
    </v-main>
    <the-footer />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import FabCart from './components/fab-cart.vue'
import TheFooter from './components/the-footer.vue'
import TheNavigation from './components/the-navigation.vue'
import TheOverlay from './components/the-overlay.vue'
export default {
  name: 'App',

  components: { TheNavigation, FabCart, TheFooter, TheOverlay },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions({
      loadUser: 'user/loadUser',
    }),

    isAuthenticated() {
      return localStorage.access_token !== undefined
    },
    showCart() {
      if (!this.isAuthenticated()) return false
      return this.$route.name !== 'Checkout'
    },
  },

  async created() {
    if (!this.isAuthenticated()) return
    await this.loadUser()
  },
}
</script>

<style>
/* Helper classes */
body {
  font-family: 'Roboto' !important;
}

.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
