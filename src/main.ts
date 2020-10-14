import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {createWebHashHistory,createRouter} from 'vue-router'
import Bbt from './components/Bbt.vue'
import Bbt2 from './components/Bbt2.vue'

const history = createWebHashHistory()
const router = createRouter({
    history:history,
    routes:[
        {path:'/',component:Bbt},
        {path:'/xxx',component:Bbt2}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
