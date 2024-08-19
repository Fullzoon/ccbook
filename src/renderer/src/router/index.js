import { createWebHistory, createRouter } from 'vue-router'
import routeMap from './routes'

import BasicLayout from '../layouts/BasicLayout.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/main',
    children: routeMap
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('../views/book/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404 not found',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router