import axios from '../helpers/axios'
// import router from '../router'

export default {
  namespaced: true,
  state: () => ({
    products: [],
    categories: [{ id: 0, name: 'All', selected: true }],
    filterId: null,
  }),

  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },
    FILTER_PRODUCT(state, payload) {
      state.filterId = payload
    },
  },

  actions: {
    // -------------------------------------
    // executor (call this instead)
    // -------------------------------------

    async loadProducts({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })
      const products = await dispatch('fetchProducts')
      if (!products) return commit('SET_LOADING', false, { root: true })
      commit('SET_PRODUCTS', products)
      commit('SET_LOADING', false, { root: true })
    },

    async loadCategories({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })
      const categories = await dispatch('fetchCategories')
      if (!categories) return commit('SET_LOADING', false, { root: true })
      commit('SET_CATEGORIES', categories)
      commit('SET_LOADING', false, { root: true })
    },

    changeCategories({ commit }, filterId) {
      commit('FILTER_PRODUCT', filterId)
    },

    async addWish({ commit, dispatch, state }, productId) {
      const products = state.products
      const index = products.findIndex(e => e.id === productId)
      products[index].isLoading = true
      commit('SET_PRODUCTS', products)

      const status = await dispatch('postWishList', productId)

      products[index].isLoading = false
      commit('SET_PRODUCTS', products)

      if (!status) return
      products[index].isFavorite = true
      commit('SET_PRODUCTS', products)
    },

    async deleteWish({ commit, dispatch, rootState, state }, productId) {
      const products = state.products
      const index = products.findIndex(e => e.id === productId)
      products[index].isLoading = true
      commit('SET_PRODUCTS', products)

      const wishlists = await dispatch('fetchWishlist')
      const wishlist = wishlists.find(e => {
        return rootState.user.user.id === e.UserId && e.ProductId === productId
      })
      const status = await dispatch('deleteWishList', wishlist.id)

      products[index].isLoading = false
      commit('SET_PRODUCTS', products)

      if (!status) return
      products[index].isFavorite = false
      commit('SET_PRODUCTS', products)
    },

    // -------------------------------------
    // API calls (only stores can call this)
    // -------------------------------------

    async fetchProducts({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.get('/products', {
          headers: { access_token },
        })
        const favorites = await dispatch('fetchWishlist')
        data.forEach(e => {
          e.isLoading = false
          e.isFavorite = false
          if (favorites) {
            favorites.forEach(fav => {
              if (fav.ProductId !== e.id) return
              e.isFavorite = true
            })
          }
          if (!e.image_url) e.image_url = require('../assets/placeholder.png')
          if (e.CategoryId) return
          e.CategoryId = 0
          e.Category = { name: 'Others' }
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },

    async fetchWishlist({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.get('/wishlists', {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },

    async postWishList({ dispatch }, productId) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.post(`/wishlists/${productId}`, null, {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },

    async deleteWishList({ dispatch }, productId) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.delete(`/wishlists/${productId}`, {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },

    async fetchCategories({ dispatch }) {
      try {
        const { access_token } = localStorage
        let { data } = await axios.get('/categories', {
          headers: { access_token },
        })
        data = [{ id: 0, name: 'All' }, ...data]
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
  },

  getters: {
    filteredProducts: state => {
      if (!state.filterId) return state.products
      return state.products.filter(
        product => product.CategoryId === state.filterId,
      )
    },
    wishlistedProducts: state => {
      return state.products.filter(e => e.isFavorite)
    },
    productSections: state => {
      const section = state.products.reduce((res, e) => {
        if (!e.CategoryId) return res
        if (!res[e.Category.name]) res[e.Category.name] = []
        res[e.Category.name].push(e)
        return res
      }, {})
      Object.keys(section).forEach(key => {
        if (section[key].length < 3) delete section[key]
        const [param1, param2, param3] = section[key]
        section[key] = [param1, param2, param3]
      })
      return section
    },
    hasWishlist: state => {
      return state.products.some(e => e.isFavorite)
    },
    selectedCategory: state => {
      return state.categories.find(e => e.selected).name
    },
  },
}
