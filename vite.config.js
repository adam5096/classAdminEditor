import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 匯入套件啟用: 自動生成路由
import Pages from 'vite-plugin-pages'
// 匯入套件啟用: 自動書寫vue 組件顯式匯入語法
import Components from 'unplugin-vue-components/vite'
// 匯入套件啟用: 取得 HeadlessUiResolver 使 vite 能在背景解析 HeadlessUi 元件名稱, 使用元件時可以省去書寫匯入語法
import { HeadlessUiResolver } from "unplugin-vue-components/resolvers";
// 匯入套件啟用: icon操作相關功能0
import Icons from 'unplugin-icons/vite'
// 匯入套件啟用: 自動書寫 icon 顯式匯入語法
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  plugins: [
    // vue 核心語法
    vue(),
    // 自動生成路由
    Pages(),
    // 自動書寫 vue元件 顯式匯入語法
    Components({
      // 自動匯入組件時, vite 從這些資料夾中開始比對組件存在與否
      dirs: ['src/components', 'src/sections'],
      resolvers: [
        IconsResolver({
          // false 表示在使用icons時無須書寫開頭i字樣
          prefix: false,
          // 只需拿取指定範圍內的圖集
          enabledCollections: ['heroicons-outline'],
        }),
        HeadlessUiResolver(),
      ],
    }),
    // icons 相關功能
    Icons({ /* options */ }),
  ],
  // vite 優化依賴 & 預編譯
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@headlessui/vue",
      "@hennge/vue3-pagination",
      "@kyvg/vue3-notification",
      "@sipec/vue3-tags-input",
      "@tiptap/extension-image",
      "@tiptap/extension-link",
      "@tiptap/starter-kit",
      "@tiptap/vue-3",
      "@vueuse/core",
      "chart.js",
      "mitt",
      "prettier",
      ],
  },
  // 開發當中, npm run dev 開啟專案時所佔用的 port number
  // server: {
  //   port: 3000,
  // },
})
