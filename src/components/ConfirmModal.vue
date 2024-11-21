<script setup>
import { useVModel } from "@vueuse/core"

const emits = defineEmits(["update:modelValue", "success", "cancel"])

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: "確定刪除嗎 ?" },
})

// const isOpen = useVModel(props,'modelValue',emit)
const isOpen = useVModel(props)

const openModal = () => {
  isOpen.value = true
  //   emits("update:modelValue", true)
}

const closeModal = () => {
  isOpen.value = false
  //   emits("update:modelValue", false)
}

const handleSuccess = () => {
  emits("success")
  closeModal()
}
const handleCancel = () => {
  emits("cancel")
  closeModal()
}
</script>
<template>
  <Modal
    v-model="isOpen"
    @cancel="handleCancel"
  >
    <template #icon>
      <HeroiconsOutlineExclamation
        class="mt-8 mx-auto w-12 h-12 text-red-600"
      />
    </template>
    <template #title>
      <DialogTitle
        as="h3"
        class="text-2xl text-center font-medium leading-6 text-red-600 tracking-wider mt-2 mb-4"
      >
        {{ title }}
      </DialogTitle>
    </template>

    <template #footer>
      <div class="grid grid-cols-2 gap-4">
        <SecondaryButton
          class="w-full py-1.5"
          @click="handleCancel"
        >
          取消
        </SecondaryButton>
        <DangerButton
          class="w-full py-1.5"
          @click="handleSuccess"
        >
          確定
        </DangerButton>
      </div>
    </template>
  </Modal>
</template>

<style scoped></style>
