<script setup>
import { useVModel } from "@vueuse/core"
import { ref } from "vue"

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  id: String,
  modelValue: File,
  defaultImage: String,
  label: String,
  error: String,
  wrapperClass: [String, Array, Object],
  imageClass: {
    type: [String, Array, Object],
    default: "aspect-w-1 aspect-h-1",
  },
  imageWrapperClass: [String, Array, Object],
})

// 為自訂元件 ImageUpload.vue 從外部資料雙向綁定
const modelfile = useVModel(props)

// 取得圖片上傳元素的 DOM
const fileEl = ref(null)

// 使用者選擇選擇本地檔案後的預覽容器
const previewImageSrc = ref(null)

// 按下選擇本地檔案按鈕後
const selectFile = () => {
  // 打開選擇本地檔案視窗
  fileEl.value.click()
}

// 當使用者選擇檔案完畢, 並點擊畫面上"開啟"後
const onChangeFile = () => {
  // 首先從記憶體中取得選擇本地檔案資料
  const [file] = fileEl.value.files

  // 使用js提供的讀取器實例對選擇本地檔案進行操作
  const reader = new FileReader()

  // 使用 readAsDataURL 方法讀出:
  // file 經過 base64 編碼後的模樣
  reader.readAsDataURL(file)

  // 異步操作: 在讀取選擇本地檔案後
  reader.onload = () => {
    const dataUrl = reader.result

    // 如此在瀏覽器開發者工具的中, img.src 欄位看見的內容就是base64編碼
    // 注意 previewImageSrc 這裡放的是預覽要用的數據, 不同於上傳給伺服器的數據
    previewImageSrc.value = dataUrl

    // 最後伺服器收到的是 file 這裡的數據
    emit("update:modelValue", file)
  }
}

// 移除當前所選本地檔案
const removeSelectedFile = () => {
  // 清空預覽上傳容器內的數據
  previewImageSrc.value = null
  // 清空上傳容器內所存數據
  emit("update:modelValue", null)
}
</script>

<template>
  <div :class="wrapperClass">
    <!-- 標題 -->
    <label
      :for="props.id"
      class="form-label"
      >{{ props.label }}
    </label>
    <!--  -->

    <div :class="imageWrapperClass">
      <div
        class="overflow-hidden"
        :class="imageClass"
      >
        <!-- 由父層傳入圖片連結時, 預覽該圖片 -->
        <img
          v-if="previewImageSrc || props.defaultImage"
          :src="previewImageSrc || props.defaultImage"
          class="object-cover"
          alt="thumbnail"
        />
        <!-- 缺少圖片連結時, 展示佔位用的灰底圖片 -->
        <div
          v-else
          class="flex justify-center items-center bg-gray-400 text-white"
        >
          <HeroiconsOutlinePhotograph
            class="w-10 h-10"
          ></HeroiconsOutlinePhotograph>
        </div>

        <!-- 刪除圖片按鈕 X : 清除當前所選本地檔案 -->
        <!-- 這個 div 作為中間層, 為隔絕 aspect-ratio 對 button 定位的直接影響 -->
        <div v-if="modelfile">
          <button
            type="button"
            class="absolute top-4 right-4 w-8 h-8 bg-gray-700/50 flex justify-center items-center text-white rounded-full"
            @click="removeSelectedFile"
          >
            <HeroiconsOutlineX class="w-5 h-5"></HeroiconsOutlineX>
          </button>
        </div>
      </div>
    </div>

    <PrimaryButton
      class="mt-3 w-full flex items-center"
      @click="selectFile"
    >
      <HeroiconsOutlineCloudUpload class="mr-1"></HeroiconsOutlineCloudUpload>
      選擇本地檔案
    </PrimaryButton>

    <!-- 錯誤訊息 -->
    <div
      v-if="props.error"
      class="form-error"
    >
      {{ props.error }}
    </div>
    <!-- 提示文字 -->
    <div class="mt-2 text-gray-500 text-sm">圖片最大 5MB</div>

    <input
      ref="fileEl"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onChangeFile"
    />
  </div>
</template>
