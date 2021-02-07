import router from './router';
import { tokenFn } from './assets/js/util';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import store from '@/store'
import jsCookie from "js-cookie";

const whiteList = ['/login','/register'];

router.beforeEach(async (to, from, next) => {
  console.log('before each');
  NProgress.start();
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '舆论情报分析系统';
  }

  if(!store.state.token) {
    // 
    store.state.token=jsCookie.get('tokenAuth')
    
  }

  const hasToken = tokenFn.getToken();
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      next();
      NProgress.done();
    }
  } else {
    
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
