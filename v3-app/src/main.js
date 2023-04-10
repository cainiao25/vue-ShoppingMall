import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

import plugin from "./utils/plugin"
// 桌面端适配
import '@vant/touch-emulator';
// 2. 引入组件样式
import 'vant/lib/index.css';

import '@/styles/reset.css';
import "@/styles/main.css"
import "@/utils/flexible.js";


const app = createApp(App)



// 3. 全局组件注册
import MyHead from "@/components/MyHead.vue"
app.use("MyHead", MyHead)
// 持久化
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)


// 注册插件
app.use(plugin, { a: 1 })

app.mount('#app')
