<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img height="250" :src="product.image_url"></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text class="my-4">
      <div class="my-2 subtitle-1">{{ product.stock }} in Stock</div>
      <div class="my-2 subtitle-1">Rp. {{ product.price }},00 each</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    product: Object,
  },
}
</script>

<style></style>
