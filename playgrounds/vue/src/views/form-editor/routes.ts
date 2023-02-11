import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/form-editor',
    name: 'form-editor',
    component: () => import('./index.vue'),
  },
] as RouteRecordRaw[]
