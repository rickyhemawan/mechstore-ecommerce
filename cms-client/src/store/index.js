import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import product from './module-product'
import banner from './module-banner'
import user from './module-user'
import router from '../router'

import axios from '../helpers/axios'

export default new Vuex.Store({
  state: () => ({
    isLoading: false,
  }),
  mutations: {
    SET_LOADING(state, status) {
      state.isLoading = status
    },
  },
  actions: {
    errorHandler(_, { toast, response }) {
      const { data } = response
      if (!data.message) return
      data.message.forEach(message => {
        toast.open({ message, type: 'error' })
      })
    },
    notFoundHandler(_, { name, response }) {
      if (response.status !== 404) return false
      router.push({
        name: 'DataNotFound',
        params: { title: `${name} Not Found` },
      })
      return true
    },

    // Hiraukan ini, tadi sempet nyoba2
    async uploadImage({ dispatch }, { file, toast }) {
      try {
        if (!file) return
        const bodyFormData = new FormData()
        bodyFormData.append('file', file)
        const { access_token } = localStorage
        const { data } = await axios.post('/images/upload', bodyFormData, {
          headers: { access_token, 'Content-Type': 'multipart/form-data' },
        })
        return data
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      }
    },
  },
  modules: { product, banner, user },
})
