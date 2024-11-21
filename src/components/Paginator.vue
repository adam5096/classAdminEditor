<script setup>
import Pagination from "@hennge/vue3-pagination"
import { useVModel } from "@vueuse/core"

const emit = defineEmits(["update:currentPage"])

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPage: {
    type: Number,
    default: 10,
  },
})

const currentPage = useVModel(props, "currentPage")
</script>

<template>
  <div class="paginator px-5 py-3">
    <Pagination
      v-model="currentPage"
      :pages="totalPage"
      hide-first-button
      hide-last-button
    ></Pagination>
  </div>
</template>

<style scoped></style>
