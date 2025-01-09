import router from './router';
import { useUserStore } from '@/stores';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

router.beforeEach((to, _, next) => {
	const userStore = useUserStore();
	const hasToken = userStore.userinfo.token;
	// 判断用户是否登录
	if (hasToken) {
		// 2.1 如果用户已登录，有token，则放行
		next();
	} else {
		// 2.2 如果用户未登录，判断是否是auth: false的页面
		if (to.meta.auth === false) {
			// 2.2.1 如果是auth: false，则放行
			next();
		} else {
			// 2.2.2 如果不是auth: false，则重定向到login页面
			next({ path: '/login' });
		}
	}
});

router.afterEach((to) => {
	NProgress.done();
	document.title = to.meta.title as string;
});
