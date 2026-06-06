import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VillaDetailView from '../views/VillaDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/villa/:id',
      name: 'villa-detail',
      component: VillaDetailView,
    },
  ],
})

export default router
