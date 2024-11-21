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
const defaultImage = ref("")

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
  title: "",
  content: "",
  image: null,
  description: "",
  tags: [],
})

// 按鈕: 發布文章
const handleSubmit = async () => {
  loading.value = true
  // 模擬具有等待特性的異步操作: 如發送API..
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
        / 新增文章
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
