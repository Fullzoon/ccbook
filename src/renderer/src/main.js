import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'

// 引入 antdv
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 引入样式
import './assets/main.css'

createApp(App)
.use(pinia)
.use(Antd)
.mount('#app')