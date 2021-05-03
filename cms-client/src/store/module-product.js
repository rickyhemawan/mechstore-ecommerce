import axios from '../helpers/axios'
import router from '../router'
export default {
  state: () => ({
    products: [],
    product: {},
    categories: [],
    form: {
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      category: '',
      file: null,
    },
  }),
  mutations: {
    RESET_FORM(state) {
      state.form = {
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        category: '',
        file: null,
      }
    },
    RESET_PRODUCT(state) {
      state.product = {}
    },
    FILL_FORM(state) {
      Object.keys(state.form).forEach(key => {
        if (!state.product[key]) return
        state.form[key] = state.product[key]
      })
    },
    SET_FORM_TITLE(state, title) {
      state.form.title = title
    },
    SET_FORM_CATEGORY(state, category) {
      state.form.category = category
    },
    SET_PRODUCT(state, { product, getters }) {
      state.product = product
      state.product.category = ''
      if (!product) return
      if (!product.CategoryId) return
      state.product.category = getters.categoryName
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
  },
  getters: {
    categoryName: state => {
      const categoryName = state.categories.find(
        e => e.id === state.product.CategoryId,
      )
      if (!categoryName) return ''
      return categoryName.name
    },
  },
  actions: {
    async fetchAllProducts(context, { toast }) {
      try {
        context.commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        const { data } = await axios.get('/products', {
          headers: { access_token },
        })
        data.forEach(e => {
          if (e.CategoryId) e.category = e.Category.name
          if (e.image_url) e.image = e.image_url
          else e.image = require('../assets/placeholder.png')
        })
        context.commit('SET_PRODUCTS', data)
      } catch ({ response }) {
        context.dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        context.commit('SET_LOADING', false, { root: true })
      }
    },
    async fetchProduct({ commit, dispatch, getters }, { toast, id }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        const { data } = await axios.get(`/products/${id}`, {
          headers: { access_token },
        })
        commit('SET_PRODUCT', { product: data, getters })
      } catch ({ response }) {
        if (response.status === 404) {
          dispatch(
            'notFoundHandler',
            { name: 'Product', response },
            { root: true },
          )
        } else {
          dispatch('errorHandler', { toast, response }, { root: true })
        }
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchCreateProduct({ state, commit, dispatch }, { toast }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        await axios.post('/products', state.form, {
          headers: { access_token },
        })
        toast.open({ message: 'Product added!', type: 'success' })
        router.push('/products')
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchUpdateProduct({ state, commit, dispatch }, { toast, id }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        await axios.put(`/products/${id}`, state.form, {
          headers: { access_token },
        })
        toast.open({ message: 'Product edited!', type: 'success' })
        router.push('/products')
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchDeleteProduct({ commit, dispatch }, { toast, id }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        await axios.delete(`/products/${id}`, {
          headers: { access_token },
        })
        toast.open({ message: 'Product deleted!', type: 'success' })
        router.push('/products')
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchCategories(
      { commit, dispatch },
      { toast, loading = true } = {},
    ) {
      try {
        if (loading) commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        const { data } = await axios.get('/categories', {
          headers: { access_token },
        })
        commit('SET_CATEGORIES', data)
      } catch ({ response: { data } }) {
        dispatch('errorHandler', { toast, data }, { root: true })
      } finally {
        if (loading) commit('SET_LOADING', false, { root: true })
      }
    },
  },
  namespaced: true,
}
