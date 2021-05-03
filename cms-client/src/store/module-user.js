import axios from '../helpers/axios'
import router from '../router'
export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    async login(context, { email, password, toast }) {
      try {
        context.commit('SET_LOADING', true, { root: true })
        const { data } = await axios.post('/login', { email, password })
        localStorage.access_token = data.access_token
        router.push('/')
      } catch ({ response: { data } }) {
        context.dispatch('errorHandler', { toast, data }, { root: true })
      } finally {
        context.commit('SET_LOADING', false, { root: true })
      }
    },
    logout(context) {
      delete localStorage.access_token
      context.dispatch('confirmAuthencity')
      router.push('/login')
    },
  },
}
