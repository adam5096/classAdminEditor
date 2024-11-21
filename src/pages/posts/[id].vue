<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
// 匯入自訂訊息提示框元件
import { successNotify } from "@/composables/useNotification"
import { promiseTimeout } from "@vueuse/core"

const router = useRouter()

// 控制載入動畫顯示與隱藏
const loading = ref(false)

// 選擇本地檔案元件: 預設圖片數據
const defaultImage = ref(
  "https://images.unsplash.com/photo-1720048171230-c60d162f93a0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
)

// 保存: 提示字庫
// 提供預設字庫並與使用輸字元做比對
// 展示被比對吻合的字庫的選單
const tagsAutocompleteItems = ref([
  "Vue2",
  "Vue3",
  "TailwindCSS",
  "@sipec/vue3-tags-input",
])

// 保存: 新增文章元件數據
const form = reactive({
  title: "這是我的文章01",
  content: `
        <h1>陳小明</h1>
        <p>前端工程師 | 台北市</p>

            <h2>關於我</h2>
            <p>擁有1年前端開發經驗, 專注於建立響應式且用戶友善的網站介面。熱愛學習新技術, 並致力於寫出清晰、可維護的程式碼</p>

            <p>這是我的gitHub首頁: <a href="https://github.com/adam5096">gitHub</a></p>

            <blockquote>
                "我相信優秀的使用者介面應該是直觀且優雅的，這也是我持續追求的目標。"
            </blockquote>

            <h2>技術能力</h2>
            <ul>
                <li>HTML5 / CSS3 / JavaScript (ES6+)</li>
                <li>React.js 開發經驗</li>
                <li>版本控制: Git</li>
                <li>CSS 框架: Tailwind CSS, Bootstrap</li>
                <li>打包工具: Webpack, Vite</li>
            </ul>

            <h2>工作經歷</h2>
            <article>
                <h3>前端工程師 - 創新數位科技有限公司</h3>
                <p>2023年3月 - 至今</p>
                <ul>
                    <li>負責公司主要產品的前端開發與維護</li>
                    <li>將舊有 jQuery 專案改寫為 React 架構</li>
                    <li>實作響應式設計，提升行動裝置使用體驗</li>
                    <li>優化網站載入速度，提升效能指標</li>
                </ul>
            </article>

        <p>聯絡方式: example@email.com</p>
    `,
  image: null,
  description: "777",
  tags: ["Tailwind CSS"],
})

// 按鈕: 發布文章
const handleSubmit = async () => {
  loading.value = true
  // 模擬具有等待特性的異步操作: 如發送API...
  await promiseTimeout(1000)

  loading.value = false

  router.push("/posts").then(() => {
    successNotify("發布文章成功")
  })
}

// 按鈕: 保存草稿
const handleSubmitDraft = async () => {
  loading.value = true
  // 模擬具有等待特性的異步操作: 如發送API..
  await promiseTimeout(1000)
  loading.value = false

  router.push("/posts").then(() => {
    successNotify("保存草稿成功")
  })
}
</script>

<template>
  <Layout>
    <!-- 麵包屑 -->
    <PageHeader>
      <template #title>
        <router-link
          to="/posts"
          class="link"
          >文章</router-link
        >
        / 編輯文章
      </template>
    </PageHeader>

    <Card
      class="mt-6"
      stretch
    >
      <CardContent>
        <PostForm
          v-model="form"
          :default-image="defaultImage"
          :tags-autocomplete-items="tagsAutocompleteItems"
          @submit="handleSubmit"
          @submit-draft="handleSubmitDraft"
        />

        <!-- loading animate -->
        <Loading
          :show="loading"
          text="保存中 ..."
        ></Loading>
      </CardContent>
    </Card>
  </Layout>
</template>
