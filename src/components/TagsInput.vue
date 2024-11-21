<script setup>
import VueTagsInput from "@sipec/vue3-tags-input"

import { ref, computed } from "vue"

defineOptions({
  inheritAttrs: false,
})

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  id: String,
  modelValue: Array,
  autocompleteItems: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "text",
  },
  error: String,
  wrapperClass: [String, Array, Object],
})

// 保存: 既有的完整標籤清單陣列
// map: 改造資料結構的欄位&值的層次關係
const tags = props.modelValue.map(
  (text) => ({ text }),
  // => { return { text:text } }
)

// 保存: 更新後的完整標籤清單
const newTag = ref("")

// 使用者輸入新增 tag 的同時與開發人員預先提供的詞庫做比對
// 展示比對命中的提示字詞
const formatAutocompleteItems = computed(() => {
  return props.autocompleteItems
    .filter(
      (text) => text.toLowerCase().indexOf(newTag.value.toLowerCase()) !== -1,
    )
    .map((text) => ({ text }))
})

// 使用者輸入新增 tag s後, 回頭展示到畫面上
const updateTags = (newTags) => {
  // map: 在資料發給父層之前，我們希望將數據簡化拆分
  // 只讀取複製 newTags 中每個成員的 text 欄位值, 後放進新陣列
  emits(
    "update:modelValue",
    newTags.map((tag) => {
      return tag.text
    }),
  )
  newTags.value = ""
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
    <!-- tags -->
    <VueTagsInput
      v-model="newTag"
      :tags="tags"
      placeholder=""
      :autocomplete-items="formatAutocompleteItems"
      @tags-changed="updateTags"
    >
    </VueTagsInput>
    <!-- 錯誤訊息 -->
    <div
      v-if="props.error"
      class="form-error"
    >
      {{ props.error }}
    </div>
  </div>
</template>
