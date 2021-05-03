import axios from '../helpers/axios'
import router from '../router'
export default {
  namespaced: true,
  state: () => ({
    banners: [],
    banner: {},
    form: {
      title: '',
      image_url: '',
      status: false,
    },
  }),
  mutations: {
    RESET_FORM(state) {
      state.form = {
        title: '',
        image_url: '',
        status: false,
      }
    },
    RESET_BANNER(state) {
      state.banner = {}
    },
    FILL_FORM(state) {
      Object.keys(state.form).forEach(key => {
        if (!state.banner[key]) return
        state.form[key] = state.banner[key]
      })
    },
    SET_BANNERS(state, banners) {
      state.banners = banners
    },
    SET_BANNER(state, banner) {
      state.banner = banner
    },
  },
  actions: {
    async fetchCreateBanner({ state, commit, dispatch }, { toast }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        await axios.post('/banners', state.form, { headers: { access_token } })
        toast.open({ message: 'Banner added!', type: 'success' })
        router.push('/banners')
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchAllBanners({ commit, dispatch }, { toast }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        const { data } = await axios('/banners', { headers: { access_token } })
        commit('SET_BANNERS', data)
      } catch ({ response }) {
        if (response.status === 404) {
          dispatch(
            'notFoundHandler',
            { name: 'Banner', response },
            { root: true },
          )
        } else {
          dispatch('errorHandler', { toast, response }, { root: true })
        }
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchBanner({ commit, dispatch }, { toast, id }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        const { data } = await axios.get(`/banners/${id}`, {
          headers: { access_token },
        })
        console.log(data, '<<<< data')
        commit('SET_BANNER', data)
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchUpdateBanner({ state, commit, dispatch }, { toast, id }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        console.log(state.form)
        await axios.put(`/banners/${id}`, state.form, {
          headers: { access_token },
        })
        toast.open({ message: 'Banner edited!', type: 'success' })
        router.push('/banners')
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchUpdateStatus({ commit, dispatch }, { toast, id, status }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        await axios.patch(
          `/banners/${id}`,
          { status },
          { headers: { access_token } },
        )
        await dispatch('fetchAllBanners', { toast })
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async fetchDeleteBanner({ commit, dispatch }, { toast, id }) {
      try {
        commit('SET_LOADING', true, { root: true })
        const { access_token } = localStorage
        await axios.delete(`/banners/${id}`, {
          headers: { access_token },
        })
        toast.open({ message: 'Banner deleted!', type: 'success' })
        router.push('/banners')
      } catch ({ response }) {
        dispatch('errorHandler', { toast, response }, { root: true })
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },
  },
}
