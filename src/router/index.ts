import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VillaDetailView from '../views/VillaDetailView.vue'

const SITE_URL = 'https://jvillahotels.com'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'J Villa Sigiriya | Private Pool Chalet Near Sigiriya Rock Fortress, Sri Lanka',
        description: 'J Villa Sigiriya is a private pool chalet minutes from Sigiriya Rock Fortress and Pidurangala Rock. Free WiFi, air-conditioning, garden & mountain views, Continental & Asian breakfast.',
      },
    },
    {
      path: '/villa/:id',
      name: 'villa-detail',
      component: VillaDetailView,
      meta: {
        title: 'J Villa Sigiriya | Private Pool Chalet — Rates & Availability',
        description: 'Book a private pool chalet at J Villa Sigiriya, Sri Lanka — free WiFi, air-conditioning, and breakfast included, minutes from Sigiriya Rock Fortress.',
      },
    },
  ],
})

/* ── Update <title>, meta description & canonical on every route change ──
   Keeps client-side navigation SEO-correct without a full page reload. */
router.afterEach((to) => {
  const title = (to.meta.title as string) ?? 'J Villa Sigiriya'
  document.title = title

  const description = (to.meta.description as string) ?? ''
  let descTag = document.querySelector('meta[name="description"]')
  if (!descTag) {
    descTag = document.createElement('meta')
    descTag.setAttribute('name', 'description')
    document.head.appendChild(descTag)
  }
  descTag.setAttribute('content', description)

  let canonicalTag = document.querySelector('link[rel="canonical"]')
  if (!canonicalTag) {
    canonicalTag = document.createElement('link')
    canonicalTag.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalTag)
  }
  canonicalTag.setAttribute('href', `${SITE_URL}${to.path}`)
})

export default router
