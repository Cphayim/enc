import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/form',
    name: 'form',
    component: () => import('./index.vue'),
  },
  {
    path: '/form/controller',
    name: 'form-controller',
    component: () => import('./Controller.vue'),
  },
  {
    path: '/form/preview/element-plus',
    name: 'form-preview-element-plus',
    component: () => import('./PreviewElementPlus.vue'),
  },
  {
    path: '/form/preview/vant',
    name: 'form-preview-vant',
    component: () => import('./PreviewVant.vue'),
  },
] as RouteRecordRaw[]
