import axios from '../helpers/axios'

export default {
  namespaced: true,
  state: () => ({
    banners: [],
  }),
  mutations: {
    SET_BANNERS(state, payload) {
      state.banners = payload
    },
  },
  actions: {
    // -------------------------------------
    // executor (call this instead)
    // -------------------------------------

    async loadBanners({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })
      const banners = await dispatch('fetchBanners')
      if (!banners) return commit('SET_LOADING', false, { root: true })
      commit(
        'SET_BANNERS',
        banners.filter(e => e.status),
      )
      commit('SET_LOADING', false, { root: true })
    },

    // -------------------------------------
    // API calls (only stores can call this)
    // -------------------------------------

    async fetchBanners({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.get('/banners', {
          headers: { access_token },
        })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
  },
  getters: {},
}
