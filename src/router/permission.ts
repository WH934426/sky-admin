import { getToken } from '@/utils/auth.ts'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import router from './index.ts'

NProgress.configure({ showSpinner: false })
router.beforeEach(async (to: RouteLocationNormalized, _from, next: NavigationGuardNext) => {
  NProgress.start()
  if (getToken()) {
    next()
  } else {
    if (!to.meta.notNeedAuth) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
  document.title = to.meta.title as string
})
