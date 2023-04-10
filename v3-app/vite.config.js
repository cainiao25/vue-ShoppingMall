import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components({
    resolvers: [VantResolver()],
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //开发的服务器配置
  server: {
    host: "0.0.0.0",
    port: 8800,
    open: true,  //自动打开浏览器
    proxy: {  // 反向代理
      '/tutu': {
        target: 'https://115292928app8001.downline.cn/',//代理的地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tutu/, '')//这里的/需要转义
      }
    }


  }
})
