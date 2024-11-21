<script setup>
import { ref } from "vue"

import { useConfirmModal } from "@/composables/useConfirmModal"

const { showModal, confirmTitle, handleSuccess, handleCancel } =
  useConfirmModal()
</script>

<template>
  <ConfirmModal
    v-model="showModal"
    :title="confirmTitle"
    @success="handleSuccess"
    @cancel="handleCancel"
  ></ConfirmModal>
</template>

<style scoped></style>
