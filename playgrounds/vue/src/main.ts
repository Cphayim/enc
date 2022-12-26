import { createApp } from 'vue'

import { createEncElementPlus } from '@cphayim-enc/vue-element-plus'
import '@cphayim-enc/vue-element-plus/style'

import { createEncVant } from '@cphayim-enc/vue-vant'
import '@cphayim-enc/vue-vant/style'

import App from './App.vue'
import router from './router'
import './style.css'

createApp(App)
  .use(router)
  .use(createEncElementPlus({ skipEncInstall: true }))
  .use(createEncVant({ skipEncInstall: true }))
  .mount('#app')
