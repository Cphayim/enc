import { createApp } from 'vue'

import EncElementPlus from '@cphayim-enc/vue-element-plus'
import '@cphayim-enc/vue-element-plus/style'

import App from './App.vue'
import router from './router'
import './style.css'

createApp(App).use(router).use(EncElementPlus).mount('#app')
