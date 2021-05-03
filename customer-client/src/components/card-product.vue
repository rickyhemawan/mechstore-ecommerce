<template>
  <v-card :loading="product.isLoading" class="my-6" width="300">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        style="position: absolute; z-index: 100"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="200" :src="product.image_url"></v-img>

    <v-card-text class="my-4">
      <h2 class="mb-2 text-truncate">{{ product.name }}</h2>
      <h3 class="mb-2 text-truncate text-green">{{ category }}</h3>
      <div class="subtitle-1 text-truncate">{{ product.stock }} in Stock</div>
      <div class="subtitle-1 text-truncate">Rp. {{ price }},00</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-row justify="space-between" align="center">
        <v-col cols="auto">
          <v-btn icon @click="onWish(product.id)">
            <v-icon v-if="product.isFavorite" color="red"> mdi-heart </v-icon>
            <v-icon v-else> mdi-heart </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn
            color="deep-purple lighten-2"
            text
            @click="addToCart(product.id)"
            :disabled="disabled"
          >
            {{ stockName }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
    <v-overlay v-if="product.isLoading" absolute></v-overlay>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    product: Object,
  },
  computed: {
    category() {
      return this.product.Category.name || ''
    },
    price() {
      return this.product.price.toLocaleString().split(',').join('.')
    },
    stockName() {
      return this.product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'
    },
    disabled() {
      if (this.product.price <= 0) return true
      return this.product.stock <= 0
    },
  },
  methods: {
    ...mapActions({
      addWish: 'product/addWish',
      deleteWish: 'product/deleteWish',
      addToCart: 'cart/addToCart',
    }),
    onWish(id) {
      if (!this.product.isFavorite) this.addWish(id)
      else this.deleteWish(id)
    },
  },
}
</script>

<style>
.text-green {
  color: #00695c;
}
</style>
