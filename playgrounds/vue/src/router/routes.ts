import type { RouteRecordRaw } from 'vue-router'

import formRoutes from '../views/form/routes'
import formEditorRoutes from '../views/form-editor/routes'

export default [
  {
    path: '/',
    redirect: '/form',
  },
  ...formRoutes,
  ...formEditorRoutes,
] as RouteRecordRaw[]
