<template>
  <div>
    <v-container class="mb-12">
      <h1>Checkout</h1>
      <table-checkout
        :carts="carts"
        :totalQty="totalQty"
        :totalPrice="totalPrice"
        @add-quantity="addQuantity"
        @minus-quantity="minusQuantity"
        @edit-quantity="showDialog"
      />
      <div>
        <v-row align="center" justify="end">
          <v-btn
            depressed
            color="error"
            class="mr-4"
            :disabled="carts.length <= 0"
            @click="resetCart"
          >
            Reset
          </v-btn>
          <v-btn
            depressed
            color="success"
            @click="checkout"
            :disabled="carts.length <= 0"
          >
            Checkout
          </v-btn>
        </v-row>
      </div>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Quantity</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                label="Quantity"
                type="number"
                v-model="editQty"
                :rules="qtyRules"
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveDialog()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import tableCheckout from '../components/table-checkout.vue'
export default {
  components: { tableCheckout },
  data: () => ({
    dialog: false,
    qtyRules: [],
    editQty: 0,
    product: null,
    cart: null,
  }),
  computed: {
    ...mapState({
      carts: state => state.cart.carts,
    }),
    ...mapGetters({
      totalQty: 'cart/totalQty',
      totalPrice: 'cart/totalPrice',
    }),
  },
  methods: {
    ...mapActions({
      addQuantity: 'cart/addQuantity',
      minusQuantity: 'cart/minusQuantity',
      editQuantity: 'cart/editQuantity',
      resetCart: 'cart/resetCart',
      checkout: 'cart/checkout',
      loadUser: 'user/loadUser',
      loadCarts: 'cart/loadCarts',
    }),
    showDialog(id) {
      this.cart = this.carts.find(e => e.id === id)
      this.product = this.cart.Product
      if (!this.product) return
      this.qtyRules = [
        v => v > 0 || 'Stock must not be a minus number',
        v => v <= this.product.stock || 'Maximum stock exceeded',
      ]
      this.dialog = true
    },
    saveDialog() {
      const editedQty = +this.editQty
      this.editQuantity({ id: this.cart.id, qty: editedQty })
      this.editQty = 0
      this.dialog = false
    },
  },
  async created() {
    await this.loadCarts()
    await this.loadUser()
  },
}
</script>

<style></style>
