<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
// 匯入自訂訊息提示框元件
import { successNotify } from "@/composables/useNotification"
import { promiseTimeout } from "@vueuse/core"

// 控制載入動畫顯示與隱藏
const loading = ref(false)

// 未來可改為發送API後取得
// 保存: 個人中心元件數據
const form = reactive({
  name: "Adam Chou",
  description: "哈囉👋我是 Adam~",
  avatar: null,
  email: "admin123@email.com",
  password: "",
})

// 選擇本地檔案元件: 預設圖片數據
const defaultAvatar = ref("https://bruce-fe-fb.web.app/image/avator.png")

// 按鈕: 保存個人中心數據
const handleSubmit = async () => {
  loading.value = true
  // 模擬具有等待特性的異步操作: 如發送API..
  await promiseTimeout(1000)

  loading.value = false

  successNotify('個人資料保存成功✅')
}
</script>

<template>
  <Layout>
    <!-- 麵包屑 -->
    <PageHeader>
      <template #title> 個人資料 </template>
    </PageHeader>

    <Card
      class="mt-6"
      stretch
    >
      <CardContent>
        <form @submit.prevent="submit">
          <div class="grid gap-6 md:grid-cols-12">
            <div class="space-y-6 md:col-span-9">
              <TextInput
                label="姓名"
                id="name"
                v-model="form.name"
              />
              <TextInput
                label="介紹"
                id="description"
                v-model="form.description"
                class="h-28"
              />
            </div>

            <!-- 上傳圖片元件 -->
            <div class="text-center order-first md:col-span-3 md:order-none">
              <ImageUpload
                id="avatar"
                v-model="form.avatar"
                :default-image="defaultAvatar"
                image-class="aspect-w-1 aspect-h-1 rounded-full"
                image-wrapper-class="w-32 mx-auto"
              />
            </div>

            <div class="md:col-span-6">
              <TextInput
                label="E-mail"
                type="email"
                id="email"
                v-model="form.email"
              />
            </div>

            <div class="md:col-span-6">
              <TextInput
                label="密碼"
                type="password"
                id="password"
                v-model="form.password"
              />
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <PrimaryButton
              type="submit"
              class="w-full md:w-auto"
              @click=""
            >
              儲存設定
            </PrimaryButton>
          </div>
        </form>
      </CardContent>
      <!-- loading animate -->
      <Loading
        :show="loading"
        text="保存中 ..."
      ></Loading>
    </Card>
  </Layout>
</template>
