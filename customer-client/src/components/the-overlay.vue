<template>
  <v-overlay :value="isLoading">
    <v-progress-circular
      indeterminate
      size="64"
      color="basil"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
    }),
  },
}
</script>

<style></style>
