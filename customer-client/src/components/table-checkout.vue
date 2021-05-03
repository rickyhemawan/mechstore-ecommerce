<template>
  <v-data-table
    :headers="headers"
    :items="carts"
    class="elevation-1 my-12"
    hide-default-footer
    disable-pagination
  >
    <template v-slot:[`item.Product.image_url`]="{ item }">
      <div class="pa-2">
        <v-img :src="item.Product.image_url" height="80px" width="80px"></v-img>
      </div>
    </template>

    <template v-slot:[`item.Product.price`]="{ item }">
      <p>{{ parseCurrency(item.Product.price) }}</p>
    </template>

    <template v-slot:[`item.Product.subtotal`]="{ item }">
      <p>{{ parseCurrency(calculateSubTotal(item)) }}</p>
    </template>

    <template v-slot:[`item.Product.actions`]="{ item }">
      <v-icon class="mr-2" @click="addItem(item.id)"> mdi-plus-circle </v-icon>
      <v-icon class="mr-2" @click="removeItem(item.id)">
        mdi-minus-circle
      </v-icon>
      <v-icon @click="editItem(item.id)"> mdi-pencil </v-icon>
    </template>
    <template slot="body.append">
      <tr>
        <th colspan="3"><h2>Total</h2></th>
        <th>
          <h3>{{ totalQty }}</h3>
        </th>
        <th colspan="2">
          <h3>{{ parseCurrency(totalPrice) }}</h3>
        </th>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: 'Name', value: 'Product.name' },
      { text: 'Image', value: 'Product.image_url' },
      { text: 'Price', value: 'Product.price' },
      { text: 'Quantity', value: 'qty' },
      { text: 'Subtotal', value: 'Product.subtotal', sortable: false },
      { text: 'Actions', value: 'Product.actions', sortable: false },
    ],
  }),
  props: {
    carts: Array,
    totalQty: Number,
    totalPrice: Number,
  },
  methods: {
    addItem(id) {
      this.$emit('add-quantity', id)
    },
    removeItem(id) {
      this.$emit('minus-quantity', id)
    },
    editItem(id) {
      this.$emit('edit-quantity', id)
    },
    calculateSubTotal(item) {
      return item.Product.price * item.qty
    },
    parseCurrency(num) {
      if (typeof num !== 'number') return num
      return `Rp. ${num.toLocaleString().split(',').join('.')},00`
    },
  },
}
</script>

<style></style>
