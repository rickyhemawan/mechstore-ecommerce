<template>
  <div>
    <b-container>
      <h1 class="mb-4">Products</h1>
      <div v-if="isLoading" class="text-center">
        <b-spinner></b-spinner>
      </div>
      <div v-else>
        <b-table
          striped
          hover
          :items="products"
          :fields="fields"
          @row-clicked="onItemClicked"
        >
          <template #cell(image)="data">
            <img :src="data.value" style="max-height: 100px" />
          </template>
          <template slot="actions" scope="environment">
            <b-btn size="sm" @click="log(environment.item)">Details</b-btn>
          </template>
        </b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    fields: [
      { key: 'id', sortable: true },
      { key: 'name', sortable: true },
      { key: 'image', sortable: false },
      { key: 'price', sortable: true },
      { key: 'stock', sortable: true },
      { key: 'category', sortable: true },
    ],
  }),
  methods: {
    ...mapActions({
      fetchProducts: 'product/fetchAllProducts',
    }),
    onItemClicked(record) {
      this.$router.push(`/products/${record.id}`)
    },
  },
  computed: {
    ...mapState({
      products: state => state.product.products,
      isLoading: state => state.isLoading,
    }),
  },
  created() {
    this.fetchProducts({ toast: this.$toast })
  },
}
</script>

<style>
.sortable tr {
  cursor: pointer;
}
td {
  cursor: pointer;
}
</style>
