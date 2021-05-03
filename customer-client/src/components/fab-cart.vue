<template>
  <v-btn fab dark large color="dark" fixed right bottom @click="toCheckout">
    <v-badge v-if="counter" color="error" :content="counter">
      <v-icon dark> {{ icon }} </v-icon>
    </v-badge>
    <v-icon v-else dark> {{ icon }} </v-icon>
  </v-btn>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    icon: 'mdi-cart',
  }),
  computed: {
    ...mapGetters({
      counter: 'cart/totalQty',
    }),
  },
  methods: {
    toCheckout() {
      this.$router.push('/checkout')
    },
  },
}
</script>

<style></style>
