
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/main.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases,mdi} from 'vuetify/iconsets/mdi'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet:'mdi',
    aliases,
    sets:{ mdi}
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)  
app.mount('#app')
