<script setup>
import { useConfirm } from "@/composables/useConfirmModal"

// 定義父元件 post 要監聽的事件
const emit = defineEmits(["delete"])

// 接收父元件 post 的傳值, 父元件握有操作數據自由度; 子元件專注在使用 & 渲染數據
const props = defineProps({
  record: Object,
  confirmText: {
    type: String,
    default: "確定刪除嗎?",
  },
})

// 使用者點擊刪除按鈕, 先跳出提醒視窗並等待操作, 最後再通知父元件 post
const handleDelete = async () => {
  if (await useConfirm(props.confirmText)) {
    emit("delete", props.record)
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-flex justify-center items-center w-8 h-8 text-gray-400 hover:text-red-600 transition-colors"
    @click="handleDelete"
  >
    <HeroiconsOutlineTrash />
  </button>
</template>
