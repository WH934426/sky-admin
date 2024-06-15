import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(
    _to: RouteLocationNormalizedLoaded,
    _from: RouteLocationNormalized,
    savedPosition: any,
  ) {
    return savedPosition || { top: 0 }
  },
})

export default router
