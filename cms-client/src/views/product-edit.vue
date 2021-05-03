<template>
  <div>
    <div v-if="isLoading" class="text-center">
      <b-spinner></b-spinner>
    </div>
    <b-container else>
      <product-form
        title="Edit Product"
        :form="form"
        :categories="categories"
        showDelete
        @category-clicked="changeCategory"
        @on-delete-clicked="onDeleteClicked"
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
    productId() {
      return this.$router.currentRoute.params.id
    },
  },
  methods: {
    ...mapMutations({
      resetForm: 'product/RESET_FORM',
      resetProduct: 'product/RESET_PRODUCT',
      fillForm: 'product/FILL_FORM',
      setFormCategory: 'product/SET_FORM_CATEGORY',
    }),
    ...mapActions({
      fetchCategories: 'product/fetchCategories',
      fetchProduct: 'product/fetchProduct',
      fetchUpdateProduct: 'product/fetchUpdateProduct',
      fetchDeleteProduct: 'product/fetchDeleteProduct',
    }),
    submit() {
      this.fetchUpdateProduct({ toast: this.$toast, id: this.productId })
    },
    changeCategory(param) {
      this.setFormCategory(param)
    },
    onDeleteClicked() {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          this.fetchDeleteProduct({ toast: this.$toast, id: this.productId })
        }
      })
    },
  },
  async created() {
    this.resetForm()
    this.resetProduct()
    await this.fetchCategories({ toast: this.$toast })
    await this.fetchProduct({ toast: this.toast, id: this.productId })
    this.fillForm()
  },
}
</script>

<style></style>
