import type { RouteRecordRaw } from 'vue-router'

import formRoutes from '../views/form/routes'

export default [
  {
    path: '/',
    redirect: '/form',
  },
  ...formRoutes,
] as RouteRecordRaw[]
