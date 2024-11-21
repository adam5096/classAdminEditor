import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"

import App from "./App.vue"

// vite-plugin-pages 具有如 NUXT 自動生成路由功能
// 其 0.19 版本以上可以使用 '~pages' 取代 'virtual:generated-pages' 這只是別名, 功能一樣
// import routes from 'virtual:generated-pages'
import routes from "~pages"
import Notifications from "@kyvg/vue3-notification"

import Chart from "chart.js/auto"

import "./styles/index.css"
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
})

app.use(router)
app.use(Notifications)
app.mount("#app")
