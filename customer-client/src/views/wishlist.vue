<template>
  <div>
    <v-container>
      <h1 v-if="hasWishlist">Wishlist</h1>

      <v-row v-if="hasWishlist" justify="center" class="my-12">
        <v-col cols="auto" v-for="product in products" :key="product.id">
          <card-product :product="product" @add-to-cart="addToCart" />
        </v-col>
      </v-row>
      <h1 v-else class="text-center">You have no wishlist</h1>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CardProduct from '../components/card-product.vue'
export default {
  components: { CardProduct },
  computed: {
    ...mapState({
      categories: state => state.product.categories,
    }),
    ...mapGetters({
      products: 'product/wishlistedProducts',
      hasWishlist: 'product/hasWishlist',
      selectedCategory: 'product/selectedCategory',
    }),
  },
  methods: {
    ...mapActions({
      loadProducts: 'product/loadProducts',
      loadCategories: 'product/loadCategories',
      changeCategory: 'product/changeCategories',
      addToCart: 'cart/addToCart',
      loadUser: 'user/loadUser',
      loadCarts: 'cart/loadCarts',
    }),
  },
  async created() {
    window.scrollTo(0, 0)
    await this.loadProducts()
    await this.loadCategories()
    await this.loadUser()
    await this.loadCarts()
  },
}
</script>

<style></style>
