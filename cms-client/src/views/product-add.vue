<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <b-spinner></b-spinner>
    </div>
    <b-container else>
      <product-form
        title="Add Product"
        :form="form"
        :categories="categories"
        @category-clicked="changeCategory"
        @submit="submit"
      />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import productForm from '../components/product-form'
export default {
  components: { productForm },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      form: state => state.product.form,
      categories: state => state.product.categories,
    }),
  },
  methods: {
    ...mapMutations({
      resetForm: 'product/RESET_FORM',
      resetProduct: 'product/RESET_PRODUCT',
      setFormCategory: 'product/SET_FORM_CATEGORY',
    }),
    ...mapActions({
      fetchCategories: 'product/fetchCategories',
      fetchCreateProduct: 'product/fetchCreateProduct',
    }),
    submit() {
      this.fetchCreateProduct({ toast: this.$toast })
    },
    changeCategory(param) {
      this.setFormCategory(param)
    },
  },
  created() {
    this.resetForm()
    this.resetProduct()
    this.fetchCategories()
  },
}
</script>

<style></style>
