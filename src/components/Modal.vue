<script setup>
import { useVModel } from "@vueuse/core"

const emits = defineEmits(["update:modelValue", "success", "cancel"])

const props = defineProps({
  modelValue: Boolean,
  title: String,
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
  <TransitionRoot
    appear
    :show="isOpen"
    as="div"
  >
    <!-- 在使用者點擊訊息提示窗背景黯淡區域 Dialog 時, 瀏覽器能聽到(@) 使用者的 close 事件 -->
    <Dialog
      as="div"
      @close="handleCancel"
      class="relative z-10"
    >
      <TransitionChild
        as="div"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-700/20" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="div"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="inline-block w-full max-w-sm transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="px-6 py-4">
                <slot name="icon"></slot>

                <slot name="title">
                  <DialogTitle
                    as="h3"
                    class="text-2xl text-center font-medium leading-6 text-gray-900"
                  >
                    {{ title }}
                  </DialogTitle>
                </slot>

                <slot name="content"> </slot>
              </div>

              <div class="p-6">
                <slot name="footer">
                  <PrimaryButton
                    class="w-full py-1.5"
                    @click="handleSuccess"
                  >
                    確定
                  </PrimaryButton>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
