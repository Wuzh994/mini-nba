import { createSSRApp } from 'vue'
import App from './App.vue'
// #ifdef APP-PLUS || H5
import Logos from 'vue-nba-logos'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  // #ifdef APP-PLUS || H5
  app.use(Logos)
  // #endif
  return {
    app,
  }
}
