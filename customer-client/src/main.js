import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification'
Vue.config.productionTip = false
import VueSweetalert2 from 'vue-sweetalert2'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-toast-notification/dist/theme-sugar.css'

Vue.use(VueSweetalert2)
Vue.use(VueToast, { position: 'top-right' })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
