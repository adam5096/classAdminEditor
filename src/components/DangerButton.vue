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
})

const { tag, buttonType } = useButton(props)
</script>

<template>
  <component
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn text-white bg-red-500 hover:bg-red-600 focus:ring-red-500 disabled:bg-red-400"
  >
    <slot></slot>
  </component>
</template>
