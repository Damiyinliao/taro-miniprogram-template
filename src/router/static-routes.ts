import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/mine',
    component: () => import('@/views/mine/index.vue'),
    meta: {
      title: '我的',
    },
  },
  {
    path: '/sub',
    component: () => import('@/subcontract/views/sub/sub.vue'),
    meta: {
      title: '分包',
    },
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   meta: {
  //     title: '找不到页面',
  //   },
  //   component: () => import('~/views/exception/error.vue'),
  // },
] as RouteRecordRaw[];
