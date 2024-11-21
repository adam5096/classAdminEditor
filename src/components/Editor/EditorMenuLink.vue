<script setup>
import { inject, nextTick, onBeforeUnmount, ref, watch } from "vue"

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
  isActive: {
    type: Function,
    default: () => false,
  },
})

// 來自最頂層元件 Editor.vue 的數據
const editor = inject("editor")
const editorEvent = inject("editorEvent")

// 開啟編輯超連結選單時, 使用者游標圈選內容, 未來被加工成超連結
const url = ref("")

// 編輯導航中的超連結 icon 提供給使用者的輸入框元素
const urlEl = ref(null)

// 控制編輯文章的超連結選單顯示與隱藏
const showPopover = ref(false)

// 監聽 Edit.vue 中發布的事件, 並隨後執行 callback
editorEvent.on("link-selected", (attrs) => {
  // console.log("attrs", attrs)
  url.value = attrs.href
})

// 銷毀累積的消息監聽
onBeforeUnmount(() => {
  editorEvent.off("link-selected")
})

// watch 監視了不具響應式的變數, 必須使用 ()=> 語法指向該變數
watch(
  () => props.isActive(),
  (isActive) => {
    // 編輯文章的連結化選單開啟時, 使用者游標停留編輯範圍內任意一處 + 該處為尚未連結化時, 自動關閉連結化選單
    if (!isActive) {
      showPopover.value = false
    }
  },
)

// 點擊編輯導航中的超連結icon後的函數
const handleAction = () => {
  //
  showPopover.value = !showPopover.value

  // 如果選單處在關閉狀態, 直接離開函數
  if (!showPopover.value) return

  // 如果圈選內容處在某個已編輯狀態
  if (props.isActive()) {
    // 更新連結
    url.value = editor.value.getAttributes("link").href || ""
  } else {
    // 每次打開連結選單, 第一時間先把 url 容器內清空 (修改變數)
    url.value = ""

    // 呼叫 editor 提供的 API 將使用者圈選段落加工成為超連結
    props.action(url.value)
  }

  // 注意這裡要拿DOM, 並且上方的修改變數也落在相同 DOM 上面, 必須等到vue本次更新畫面周期完成後才能的到DOM
  // 搭配使用 nextTick

  // nextTick(() => {
  //   urlEl.value.focus()
  // })

  // setTimeout 執行時間點比 nextTick 再晚一點點
  setTimeout(() => {
    urlEl.value.focus()
  }, 0)
}
// 點擊編輯導航中的超連結icon後的修改連結字串
const handleSubmit = () => {
  // 超連結化: 接收使用者輸入url
  props.action(url.value)
  // 關閉修改超連結的彈出選單
  showPopover.value = false
}
// 點擊編輯導航中的超連結icon後的移除連結

const handleUnlink = () => {
  // 移除超連結
  props.action(null)
  // 關閉修改超連結的彈出選單
  showPopover.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="mr-1 w-7 h-7 p-1 rounded"
      :class="
        isActive()
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
      class="mt-1.5 absolute top-full left-[-103px] md:left-auto w-[300px] p-2 flex items-center bg-white border border-gray-200 rounded shadow-md"
    >
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
      <button
        type="button"
        title="取消連結"
        class="ml-1 flex-shrink-0 w-7 h-7 p-1 rounded hover:bg-violet-600 hover:text-white"
        @click="handleUnlink"
      >
        <RemixIcon icon="link-unlink"></RemixIcon>
      </button>
      <a
        :href="url"
        target="_blank"
        title="瀏覽網頁"
        class="ml-1 flex-shrink-0 w-7 h-7 p-1 rounded hover:bg-violet-600 hover:text-white"
      >
        <RemixIcon icon="external-link-line"> </RemixIcon>
      </a>
    </div>
  </div>
</template>
