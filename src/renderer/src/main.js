import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'
import router from './router/index'

// 引入 antdv
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 引入样式
import './style/reset.css'
import './style/main.less'

const app = createApp(App)

// 全局变量
app.config.globalProperties.$env = import.meta.env.MODE

app
.use(router)
.use(pinia)
.use(Antd)
.mount('#app')