import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import Notifications from 'notiwind'
const app = createApp(App)

app.use(router)
app.use(Notifications)
app.mount('#app')
