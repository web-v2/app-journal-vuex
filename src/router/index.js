import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import daybootRouter from '@/modules/daybook/router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/dayboot',
    ...daybootRouter
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
