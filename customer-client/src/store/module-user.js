import axios from '../helpers/axios'
import router from '../router'
export default {
  namespaced: true,
  state: () => ({
    user: null,
  }),
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
  },
  actions: {
    // -------------------------------------
    // executor (call this instead)
    // -------------------------------------

    async register({ commit, dispatch }, payload) {
      commit('SET_LOADING', true, { root: true })
      const user = await dispatch('postRegister', payload)
      if (!user) return commit('SET_LOADING', false, { root: true })

      const { access_token } = await dispatch('postLogin', user)
      if (!access_token) return commit('SET_LOADING', false, { root: true })

      localStorage.access_token = access_token
      router.push('/')

      commit('SET_LOADING', false, { root: true })
    },

    async login({ commit, dispatch }, payload) {
      commit('SET_LOADING', true, { root: true })
      const { access_token } = await dispatch('postLogin', payload)
      if (!access_token) return commit('SET_LOADING', false, { root: true })

      localStorage.access_token = access_token
      router.push('/')
      commit('SET_LOADING', false, { root: true })
    },

    async logout({ commit }) {
      delete localStorage.access_token
      commit('SET_USER', null)
      router.push('/login')
    },

    async loadUser({ commit, dispatch }) {
      commit('SET_LOADING', true, { root: true })

      const user = await dispatch('fetchCurrentUser')
      if (!user) return commit('SET_LOADING', false, { root: true })

      commit('SET_USER', user)

      commit('SET_LOADING', false, { root: true })
    },

    // -------------------------------------
    // API calls (only stores can call this)
    // -------------------------------------

    async postRegister({ dispatch }, payload) {
      try {
        const { data } = await axios.post('/register', payload)
        return { ...data, password: payload.password }
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },

    async postLogin({ dispatch }, payload) {
      try {
        const { data } = await axios.post('/login', payload)
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },

    async fetchCurrentUser({ dispatch }) {
      try {
        const { access_token } = localStorage
        const { data } = await axios.get('/user', { headers: { access_token } })
        return data
      } catch (error) {
        dispatch('errorHandler', error, { root: true })
        return false
      }
    },
  },
}
