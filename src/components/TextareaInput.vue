<script setup>
import { useVModel } from "@vueuse/core"

defineOptions({
  inheritAttrs: false,
})

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  id: String,
  modelValue: String,
  label: {
    type: String,
    default: "text",
  },
  error: String,
  wrapperClass: [String, Array, Object],
})

// useVModel
// 1. 自動監聽並關聯雙向綁定的預設傳遞參數 props.modelValue
// 2. 自動並激發 update:modelValue 雙向事件並通知父元件
const value = useVModel(props)
</script>

<template>
  <div :class="wrapperClass">
    <!-- 標題 -->
    <label
      :for="props.id"
      class="form-label"
      >{{ props.label }}
    </label>
    <!-- area -->
    <textarea
      class="form-textarea"
      :id="props.id"
      v-model="value"
      v-bind="$attrs"
    ></textarea>
    <!-- 錯誤訊息 -->
    <div
      v-if="props.error"
      class="form-error"
    >
      {{ props.error }}
    </div>
  </div>
</template>
