// INI GA DI PAKE, buat kenang2an wkwkwk
import Vue from 'vue'
import axios from '../helpers/axios'
export default {
  namespaced: true,
  state: () => ({
    products: [],
  }),
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    ADD_PRODUCT(state, payload) {
      state.products.push(payload)
    },
  },
  actions: {
    // -------------------------------------
    // executor (call this instead)
    // -------------------------------------
    addToCart({ state, commit }, productId) {
      const products = state.products
      const isProduct = products.some(e => e.productId === productId)
      if (!isProduct) {
        commit('ADD_PRODUCT', { productId, qty: 1 })
        return
      }
      products.forEach(p => (p.productId === productId ? p.qty++ : null))
      commit('SET_PRODUCTS', products)
    },
    resetCart({ commit }) {
      commit('SET_PRODUCTS', [])
    },
    populateProducts({ state, rootState, commit }) {
      const products = state.products.map(p => {
        rootState.product.products.forEach(
          ({ id, name, image_url, price, stock }) => {
            if (id !== p.productId) return
            p = { ...p, name, image_url, price, stock }
          },
        )
        return p
      })
      commit('SET_PRODUCTS', products)
    },
    addQuantity({ state, commit }, productId) {
      const products = state.products
      const index = products.findIndex(e => e.productId === productId)
      if (products[index].qty >= products[index].stock) return
      products[index].qty++
      commit('SET_PRODUCTS', products)
    },
    minusQuantity({ state, commit }, productId) {
      const products = state.products
      const index = products.findIndex(e => e.productId === productId)
      if (products[index].qty <= 0) return
      products[index].qty--
      if (products[index].qty <= 0) products.splice(index, 1)
      commit('SET_PRODUCTS', products)
    },
    editQuantity({ state, commit }, { productId, qty }) {
      const products = state.products
      const index = products.findIndex(e => e.productId === productId)
      if (qty < 0) return
      if (products[index].stock < qty) return
      products[index].qty = qty
      if (products[index].qty <= 0) products.splice(index, 1)
      commit('SET_PRODUCTS', products)
    },

    async checkout({ commit, dispatch, state }) {
      const product = state.products.find(e => e.qty > e.stock || e.qty < 0)
      if (product) {
        Vue.swal(
          'Whoops!',
          `It seems like the stock of ${product.name} has only ${product.stock} pcs`,
          'error',
        )
        return
      }
      commit('SET_LOADING', true, { root: true })
      const status = await dispatch('postCheckout')
      if (!status) commit('SET_LOADING', false, { root: true })
      Vue.swal('Thank You!', 'Your order will be delivered soon!', 'success')
      commit('SET_PRODUCTS', [])
      commit('SET_LOADING', false, { root: true })
    },
    // -------------------------------------
    // API calls (only stores can call this)
    // -------------------------------------

    async postCheckout({ dispatch, state }) {
      try {
        const { access_token } = localStorage
        const cart = state.products.map(({ productId: id, qty }) => ({
          id,
          qty,
        }))
        const { data } = await axios.post(
          `/checkout`,
          { cart },
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
  },
  getters: {
    totalQty: state => state.products.reduce((acc, { qty }) => (acc += qty), 0),
    totalPrice: state =>
      state.products.reduce((acc, { price, qty }) => (acc += price * qty), 0),
  },
}
