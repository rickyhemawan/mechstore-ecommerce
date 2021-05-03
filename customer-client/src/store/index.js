import Vue from 'vue'
import Vuex from 'vuex'

import banner from './module-banner'
import product from './module-product'
import user from './module-user'
import cart from './module-cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    isLoading: false,
  }),
  mutations: {
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
  },
  actions: {
    errorHandler(_, { response }) {
      if (!response?.data?.message) return
      const { data } = response
      data.message.forEach(message => {
        Vue.$toast.open({ message, type: 'error' })
      })
    },
  },
  modules: { banner, product, user, cart },
})
