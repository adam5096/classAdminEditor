<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "載入中",
  },
})
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class=" opacity-100"
    leave-active-class="transition-opacity duration-150 "
    leave-from-class=" opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="absolute inset-0 bg-white/90 flex justify-center items-center text-violet-600"
    >
      <LoadingIcon class="w-6 h-6"></LoadingIcon>
      <span class="ml-2 text-lg">{{ props.text }}</span>
    </div>
  </transition>
</template>
