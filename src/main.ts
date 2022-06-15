import { createSSRApp } from 'vue'
import App from './App.vue'
import Logos from 'vue-nba-logos'

export function createApp() {
  const app = createSSRApp(App)
  app.use(Logos)

  return {
    app,
  }
}
