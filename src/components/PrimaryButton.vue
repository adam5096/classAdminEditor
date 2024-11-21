<script setup>
// 客製按鈕行為
// 1. 當使用 PrimaryButton 元件並傳入原生 button 的 type 值去作為 <component> 元件 is 值時, 則 PrimaryButton 元件表現成相對應 type 的 button!!
// 2. 當使用 PrimaryButton 元件並傳入 to="/" 作為參數時, 則 PrimaryButton 元件表現成 RouterLink 行為
// 3. 當使用 PrimaryButton 元件時沒有傳入任何 props, 將 PrimaryButton 元件表現成一般按鈕

import { defineProps, ref } from "vue"
import useButton from "@/composables/useButton"

const props = defineProps({
  is: String,
  type: String,
  to: String,
  loading: {
    type: Boolean,
    default: false,
  },
})

const { tag, buttonType } = useButton(props)
</script>

<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn text-white bg-violet-500 hover:bg-violet-600 focus:ring-violet-500 disabled:bg-violet-400"
    :disabled="loading"
  >
    <LoadingIcon
      v-if="loading"
      class="w-5 h-5 mr-1"
    ></LoadingIcon>
    <slot></slot>
  </component>
</template>
