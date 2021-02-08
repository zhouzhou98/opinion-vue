import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
Vue.use(VueRouter)
import Layout from '@/layout/index.vue'
import Detail from '@/layout/detail.vue'
import { TabPane } from '../../node_modules/element-ui';

export const OpinionRoutes=[
  {
    path: '/detail/summary',
    name: 'summary',
    title: '舆情信息汇总',
    component: () => import('../views/summary/opinionSummary/index.vue'),
    redirect: '/detail/summary/basic',
    children: [
      {
        path: '/detail/summary/basic',
        name: 'summary-basic',
        title: '舆情基本信息',
        component: () => import('../views/summary/opinionSummary/basicMessage.vue'),
        meta: { title: '舆情基本信息'}
       },
       {
        path: '/detail/summary/detail',
        name: 'summary-detail',
        title: '舆情详细信息',
        component: () => import('../views/summary/opinionSummary/detailMessage.vue'),
        meta: { title: '舆情详细信息' },
       },
       {
        path: '/detail/summary/word',
        name: 'summary-word',
        title: '词云分析',
        component: () => import('../views/summary/opinionSummary/wordCloud.vue'),
        meta: { title: '词云分析'},
       }
    ]
  },
  {
    path: '/detail/posOrNeg',
    name: 'posOrNeg',
    title: '正负舆情信息汇总',
    component: () => import('../views/summary/posOrNegSummary/index.vue'),
    redirect: '/detail/posOrNeg/positive',
    children: [
      {
        path: '/detail/posOrNeg/positive',
        name: 'posOrNeg-positive',
        title: '正面舆情信息',
        component: () => import('../views/summary/posOrNegSummary/positive.vue'),
        meta: { title: '正面舆情信息'}
       },
       {
        path: '/detail/posOrNeg/negative',
        name: 'posOrNeg-negative',
        title: '负面舆情信息',
        component: () => import('../views/summary/posOrNegSummary/negative.vue'),
        meta: { title: '负面舆情信息' },
       }
    ]
  },
  {
    path: '/detail/warning',
    name: 'warning',
    title: '舆情预警中心',
    component: () => import('../views/summary/warningSummary/warningBasic.vue')
  },

]
export const NavRoutes = [
  
 
  {
    path: '/keyword',
    name: 'keyword',
    title: '舆情关键字管理',
    component: () => import('../views/person/keyword/index.vue')
  },

  {
    path: '/user',
    name: 'user',
    title: '个人信息管理',
    component: () => import('../views/person/user/index.vue'),
    redirect: '/user/username',
    children: [
      {
        path: '/user/username',
        name: 'user-username',
        title: '用户名修改',
        component: () => import('../views/person/user/user-info/username.vue'),
        meta: { title: '用户信息管理'}
       },
       {
        path: '/user/password',
        name: 'user-password',
        title: '密码修改',
        component: () => import('../views/person/user/user-info/password.vue'),
        meta: { title: '密码修改' },
       },
       {
        path: '/user/email',
        name: 'user-email',
        title: '邮箱修改',
        component: () => import('../views/person/user/user-info/email.vue'),
        meta: { title: '邮箱修改'},
       }
    ]
  },
  {
    path: '/log',
    name: 'log',
    title: '个人日志管理',
    component: () => import('../views/person/log/index.vue')
  }

 
]
const routes = [

  {
    path: '/',
    component: Layout,
    meta:{requireAuth:true},
    children: [
      ...NavRoutes,
    ]
  },
  {
    path: '/detail/summary',
    component: Detail,
    meta:{requireAuth:true},
    children: [
      ...OpinionRoutes,
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register')
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}
router.beforeEach((to, from, next) => {
  
  // console.log(to.path)

  if (to.matched.some(r =>{
   
    r.meta.requireAuth
  } )) {   //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    // console.log(store.state.token)
    
    if (store.state.token) {
      
      next();
    }
    else {
      
      next({
        path: '/login',
        // query: {
        //   redirect: to.fullPath
        // }
      })
    }
  }else {
    
    next();
    }
  })
export default router
