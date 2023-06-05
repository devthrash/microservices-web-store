import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from "@/stores/token";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/:category?',
      name: 'catalog',
      component: () => import('../views/catalog/CatalogView.vue'),
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/search/:text/:page([1-9]+)?',
      name: 'search_products',
      component: () => import('../views/catalog/SearchView.vue'),
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/product/:productId',
      name: 'product_page',
      component: () => import('../views/ProductView.vue'),
      props: true,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/basket/BasketView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/basket/checkout',
      name: 'checkout',
      component: () => import('../views/basket/CheckoutView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/basket/checkout-success',
      name: 'checkout_success',
      component: () => import('../views/basket/CheckoutSuccessView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/customer',
      component: () => import('../views/user/CustomerLayout.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'my-profile',
          name: 'my_profile',
          component: () => import('../views/user/MyProfileView.vue')
        },
        {
          path: 'addresses',
          name: 'manage_addresses',
          component: () => import('../views/user/AddressManagementView.vue')
        },
        {
          path: 'orders',
          name: 'customer_orders',
          component: () => import('../views/user/OrdersView.vue')
        }
      ]
    },
  ]
})

router.beforeEach((to, from) => {
  const tokenStore = useTokenStore()

  if (to.meta.requiresAuth && !tokenStore.token) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
  }
}
