import Vue from 'vue'
import axios from '../helpers/axios'
export default {
  namespaced: true,
  state: () => ({
    carts: [],
  }),
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    ADD_PRODUCT(state, payload) {
      state.products.push(payload)
    },
    SET_CARTS(state, payload) {
      state.carts = payload
    },
  },
  actions: {
    // -------------------------------------
    // executor (call this instead)
    // -------------------------------------
    async addToCart({ rootState, commit, dispatch }, productId) {
      const products = rootState.product.products
      const index = products.findIndex(e => e.id === productId)
      products[index].isLoading = true
      commit('product/SET_PRODUCTS', products, { root: true })
      const status = await dispatch('postCartItem', { productId, qty: 1 })

      if (!status) {
        products[index].isLoading = false
        commit('product/SET_PRODUCTS', products, { root: true })
        return
      }

      const carts = await dispatch('fetchCart')
      commit('SET_CARTS', carts)

      Vue.$toast.open({
        message: `${products[index].name} added!`,
        type: 'success',
      })
      products[index].isLoading = false
      commit('product/SET_PRODUCTS', products, { root: true })
    },

    async loadCarts({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })
      const carts = await dispatch('fetchCart')
      commit('SET_CARTS', carts)
      commit('SET_LOADING', false, { root: true })
    },

    async addQuantity({ state, commit, dispatch }, id) {
      const carts = state.carts
      const index = carts.findIndex(e => e.id === id)
      if (carts[index].qty >= carts[index].Product.stock) return
      carts[index].qty++
      commit('SET_CARTS', carts)
      await dispatch('patchQuantity', { id, qty: carts[index].qty })
    },
    async minusQuantity({ state, commit, dispatch }, id) {
      const carts = state.carts
      const index = carts.findIndex(e => e.id === id)
      if (carts[index].qty <= 0) return
      carts[index].qty--
      if (carts[index].qty <= 0) {
        carts.splice(index, 1)
        commit('SET_CARTS', carts)
        await dispatch('deleteOneCart', id)
        return
      }
      commit('SET_CARTS', carts)
      await dispatch('patchQuantity', { id, qty: carts[index].qty })
    },
    async editQuantity({ state, commit, dispatch }, { id, qty }) {
      const carts = state.carts
      const index = carts.findIndex(e => e.id === id)
      if (qty < 0) return
      if (carts[index].Product.stock < qty) return
      carts[index].qty = qty
      if (carts[index].qty <= 0) {
        carts.splice(index, 1)
        commit('SET_CARTS', carts)
        await dispatch('deleteOneCart', id)
        return
      }
      commit('SET_CARTS', carts)
      await dispatch('patchQuantity', { id, qty: carts[index].qty })
    },

    async checkout({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })
      await dispatch('postCheckout')
      const carts = await dispatch('fetchCart')
      commit('SET_CARTS', carts)
      commit('SET_LOADING', false, { root: true })
    },

    async resetCart({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })
      await dispatch('deleteCart')
      const carts = await dispatch('fetchCart')
      commit('SET_CARTS', carts)
      commit('SET_LOADING', false, { root: true })
    },
    // -------------------------------------
    // API calls (only stores can call this)
    // -------------------------------------
    async postCartItem({ dispatch }, { productId, qty }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.post(
          `/carts/${productId}`,
          { qty },
          {
            headers: { access_token },
          },
        )
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
    async fetchCart({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.get('/carts', {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
    async deleteCart({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.delete('/carts', {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
    async deleteOneCart({ dispatch }, cartId) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.delete(`/carts/${cartId}`, {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
    async patchQuantity({ dispatch }, { id, qty }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.patch(
          `/carts/${id}`,
          { qty },
          { headers: { access_token } },
        )
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
    async postCheckout({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.post('/carts/checkout', null, {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
  },
  getters: {
    totalQty: state => state.carts.reduce((acc, { qty }) => (acc += qty), 0),
    totalPrice: state =>
      state.carts.reduce(
        (acc, { Product: { price }, qty }) => (acc += price * qty),
        0,
      ),
  },
}
