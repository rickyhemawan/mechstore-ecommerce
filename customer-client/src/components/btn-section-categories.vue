<template>
  <div class="text-center full-width">
    <v-btn rounded color="green" dark @click="toProducts">
      Show more {{ name }}
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
  },
  methods: {
    toProducts() {
      this.$router.push('/products')
    },
  },
}
</script>

<style>
.full-width {
  width: 100%;
}
</style>
