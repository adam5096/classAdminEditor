<script setup>
import { onClickOutside } from "@vueuse/core"
import { nextTick, ref } from "vue"

// import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg"

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
})

// 來自最頂層元件 Editor.vue 的數據
// const editorEvent = inject("editorEvent")

// 開啟編輯超連結選單時, 使用者游標圈選內容, 未來被加工成超連結
const url = ref("")

// 編輯導航中的Image icon 提供給使用者的輸入框元素
const urlEl = ref(null)

// 控制編輯文章的 Image 選單顯示與隱藏
const showPopover = ref(false)

// 編輯導航中的 Image 彈出選單的 DOM
const popoverEl = ref(null)

// 上傳圖片按鈕的 DOM
const fileEl = ref(null)

// 點擊編輯導航中的超連結 icon 後的函數
const handleAction = () => {
  //
  showPopover.value = !showPopover.value

  // 如果選單處在關閉狀態, 直接離開函數
  if (!showPopover.value) return

  //
  url.value = ""

  onClickOutside(popoverEl, (event) => {
    // 關閉上傳圖片 icon 的彈出選單
    showPopover.value = false
  })

  // setTimeout 執行時間點比 nextTick 再晚一點點
  nextTick(() => {
    urlEl.value.focus()
  }, 0)
}

// 點擊編輯導航中的圖片icon後的修改連結字串
const handleSubmit = () => {
  // 當前功能視窗處在開啟時, 直接離開函數
  if (!showPopover.value) return

  if (url.value) {
    // console.log('url.value @@@ ', url.value);
    // 超連結化: 接收使用者輸入url
    props.action(url.value)
  }
  // 關閉修改超連結的彈出選單
  showPopover.value = false
}

// 選擇圖片
const selectFile = () => {
  fileEl.value.click()
}

// 當選擇圖片的環節中換成新圖片時
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

    props.action(dataUrl)

    // 關閉修改超連結的彈出選單
    showPopover.value = false
  }
}
</script>

<template>
  <div class="relative">
    <button
      class="mr-1 w-7 h-7 p-1 rounded"
      :class="
        showPopover
          ? 'bg-violet-600 text-white'
          : 'hover:bg-violet-600 hover:text-white'
      "
      @click="handleAction"
      :title="props.title"
    >
      <RemixIcon :icon="props.icon"></RemixIcon>
    </button>

    <div
      v-if="showPopover"
      ref="popoverEl"
      class="mt-1.5 absolute top-full left-[-103px] md:left-auto w-[300px] bg-white border border-gray-200 rounded shadow-md"
    >
      <TabGroup>
        <TabList
          class="flex items-center space-x-2 px-3 pt-2.5 border-b border-gray-200"
        >
          <Tab
            v-for="label in ['連結', '上傳圖片']"
            as="template"
            v-slot="{ selected }"
            ><button
              type="button"
              class="pb-1 text-sm tracking-wide border-b-2 focus:outline-none"
              :class="
                selected
                  ? 'text-violet-600 border-violet-600'
                  : 'text-gray-500 border-transparent'
              "
            >
              {{ label }}
            </button></Tab
          >
        </TabList>
        <TabPanels class="px-3 py-3.5">
          <TabPanel class="flex items-center">
            <input
              type="text"
              ref="urlEl"
              class="form-input text-sm px-2 py-1"
              placeholder="連結..."
              v-model="url"
              @keyup.enter="handleSubmit"
            />

            <button
              type="button"
              title="插入連結"
              class="ml-1 flex-shrink-0 w-7 h-7 p-1 rounded hover:bg-violet-600 hover:text-white"
              @click="handleSubmit"
            >
              <RemixIcon icon="check-line"></RemixIcon>
            </button>
          </TabPanel>
          <TabPanel>
            <PrimaryButton
              class="btn-sm w-full flex- items-center"
              @click="selectFile"
            >
              <HeroiconsOutlineCloudUpload class="mr-1">
              </HeroiconsOutlineCloudUpload>
              選擇圖片
            </PrimaryButton>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      <input
        ref="fileEl"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onChangeFile"
      />
    </div>
  </div>
</template>
