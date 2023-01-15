import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Products from '../views/Products.vue'
import Signin from '../views/Signin.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: Signin

  },
  {
    path:'/cart',
    name:'cart',
    component: Cart

  },
  {
    path:'/order',
    name: 'order',
    component: Order
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
