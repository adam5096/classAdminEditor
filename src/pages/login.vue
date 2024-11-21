<script setup>
import { promiseTimeout } from "@vueuse/core"
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
const form = reactive({
  email: "",
  password: "",
})

// 路由器實例化
const router = useRouter()

// 控制載入中 icon 的出現與隱藏
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  // 模擬具有等待特性的異步操作: 如發送API驗證使用者資料..
  await promiseTimeout(1000)
  loading.value = false
  // 模擬跳轉首頁
  router.push("/")
}
</script>

<template>
  <div class="flex justify-center items-center bg-violet-600 min-h-screen">
    <div class="w-[400px] px-4">
      <h1 class="flex justify-center items-center text-white">
        <HeroiconsOutlineBookOpen class="w-10 h-10" />
        <span class="text-4xl font-medium">Adam Press</span>
      </h1>

      <Card class="mt-8 p-6 sm:p-8">
        <!-- @submit.prevent="handleSubmit" -->
        <!-- 告訴 vue 截住表單元素的原生提交事件, 改接成開發人員自訂事件 handleSubmit -->
        <form
          class="space-y-8"
          @submit.prevent="handleSubmit"
        >
          <TextInput
            label="E-mail"
            type="email"
            id="email"
            v-model="form.email"
          >
          </TextInput>
          <TextInput
            label="密碼"
            type="password"
            id="password"
            v-model="form.password"
          >
          </TextInput>

          <PrimaryButton
            type="submit"
            class="w-full"
            :loading="loading"
            >登入</PrimaryButton
          >
        </form>

        <!-- 沒有帳號? 馬上註冊 -->
        <hr class="mt-6 mb-4 border-gray-300" />
        <div class="text-center text-gray-600">
          沒有帳號?
          <router-link
            to="/register"
            class="link"
            >馬上註冊</router-link
          >
        </div>
      </Card>
    </div>
  </div>
</template>
