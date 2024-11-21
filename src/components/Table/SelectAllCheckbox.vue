<script setup>
// 全選框元件: 實作雙向綁定功能在自訂義元件 SelectAllCheckbox.vue 身上

import { ref, onMounted, watch } from "vue"

const emit = defineEmits(["update:state"])

const props = defineProps({
  state: String, // 'none', 'all', 'some'
})

// 保存 input DOM
const el = ref(null)

// 本元件 SelectAllCheckbox 保存, 用來比對來自父元素資料, 比對後進行後續操作
const checkboxState = ref(false)

const updateState = (event) => {
  // 拿到 input 中的 checked 欄位的值
  emit("update:state", event.target.checked ? "all" : "none")
}

// 根據讀取使用者勾選核取框的核取狀態, 將對應狀態寫入到 input 元素的幾個欄位值中
const setElementState = (newState) => {
  if (newState === "none") {
    checkboxState.value = false
    el.value.indeterminate = false
  } else if (newState === "all") {
    checkboxState.value = true
    el.value.indeterminate = false
  } else if (newState === "some") {
    checkboxState.value = false
    el.value.indeterminate = true
  }
}

// 在頁面渲染完成後, 在 onMounted 生命週期中執行 setElementState
onMounted(() => {
  setElementState(props.state)
})

// 未來每當 props.state 值發生改變, 都再次執行 setElementState
// watch
watch(
  () => props.state,
  (newState) => {
    setElementState(newState)
  },
)
</script>

<template>
  <input
    ref="el"
    type="checkbox"
    class="form-checkbox"
    :checked="checkboxState"
    @change="updateState"
  />
</template>
