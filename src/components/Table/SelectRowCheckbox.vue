<script setup>
// 各別選框元件: 實作雙向綁定功能在自訂義元件 SelectRowCheckbox.vue 身上
const emit = defineEmits(["update:state"])

const props = defineProps({
  state: Boolean,
  index: Number,
})

const updateState = (event) => {
  // 拿到 input 中的 checked 欄位的值
  emit("update:state", event.target.checked, props.index)
}
</script>

<template>
  <input
    type="checkbox"
    class="form-checkbox"
    :checked="props.state"
    @change="updateState"
  />
</template>
