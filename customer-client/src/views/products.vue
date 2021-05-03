<template>
  <div>
    <v-container>
      <h1>Products</h1>
      <category-chips
        @category-changed="changeCategory"
        :categories="categories"
      />
      <v-row justify="center" class="my-12">
        <v-col cols="auto" v-for="product in products" :key="product.id">
          <card-product :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CardProduct from '../components/card-product.vue'
import CategoryChips from '../components/category-chips.vue'
export default {
  components: { CardProduct, CategoryChips },
  computed: {
    ...mapState({
      categories: state => state.product.categories,
    }),
    ...mapGetters({
      products: 'product/filteredProducts',
      selectedCategory: 'product/selectedCategory',
    }),
  },
  methods: {
    ...mapActions({
      loadProducts: 'product/loadProducts',
      loadCategories: 'product/loadCategories',
      changeCategory: 'product/changeCategories',
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
