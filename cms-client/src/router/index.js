import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import About from '@/views/about.vue'
import BannerShow from '@/views/banner-show.vue'
import BannerAdd from '@/views/banner-add.vue'
import BannerEdit from '@/views/banner-edit.vue'
import ProductShow from '@/views/product-show.vue'
import ProductAdd from '@/views/product-add.vue'
import ProductEdit from '@/views/product-edit.vue'
import NotFound from '@/views/not-found.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/not-found',
    name: 'DataNotFound',
    component: NotFound,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/products',
    name: 'ProductShow',
    component: ProductShow,
  },
  {
    path: '/products/add',
    name: 'ProductAdd',
    component: ProductAdd,
  },

  {
    path: '/products/:id/',
    name: 'ProductEdit',
    component: ProductEdit,
  },

  {
    path: '/banners',
    name: 'BannerShow',
    component: BannerShow,
  },
  {
    path: '/banners/add',
    name: 'BannerAdd',
    component: BannerAdd,
  },
  {
    path: '/banners/:id',
    name: 'BannerEdit',
    component: BannerEdit,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token)
    return next({ name: 'Login' })
  if (to.name === 'Login' && localStorage.access_token)
    return next({ name: 'Home' })
  next()
})

export default router
