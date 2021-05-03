import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Products from '../views/products.vue'
import Authentication from '../views/authentication.vue'
import Checkout from '../views/checkout.vue'
import Wishlist from '../views/wishlist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/login',
    name: 'Login',
    component: Authentication,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.name !== 'Login' && !localStorage.access_token)
    return next({ name: 'Login' })
  if (to.name === 'Login' && localStorage.access_token)
    return next({ name: 'Home' })
  next()
})

export default router
