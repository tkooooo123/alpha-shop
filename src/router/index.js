import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Products from '../views/Products.vue'
import Signin from '../views/Signin.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import store from './../store'
import AdminDashboard from '../views/AdminDashboard.vue'


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
    path: '/admin',
    name: 'admin-dashboard',
    component: AdminDashboard,
    children: [
      {
        path: '/admin/products',
        name:'admin-products',
        component: () => import('../views/dashboard/AdminProducts.vue')
      },
      {
        path: '/admin/categories',
        name:'admin-categories',
        component: () => import('../views/dashboard/AdminCategories.vue')
      },
      {
        path: '/admin/orders',
        name:'admin-orders',
        component: () => import('../views/dashboard/AdminOrders.vue')
      },
    ]
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

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
