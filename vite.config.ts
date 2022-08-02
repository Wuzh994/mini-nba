import path from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    Components({
      resolvers: [VantResolver()]
    }),
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      external: [
        '@vant/use',
        '@vant/popperjs',
        /node_modules/
      ]
    }
  }
})
