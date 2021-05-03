import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification'
import VueSweetalert2 from 'vue-sweetalert2'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'sweetalert2/dist/sweetalert2.min.css'

// Make BootstrapVue available throughout your project
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueToast, { position: 'top-right' })
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
