<script setup>
const props = defineProps({
  show: Boolean,
})

// console.log("props.show =>", props.show)
</script>

<template>
  <transition
    enter-active-class="transition-transform duration-200 "
    enter-from-class="translate-y-full"
    enter-to-class="translate-y-0"
    leave-active-class="transition-transform duration-150 "
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="props.show"
      class="fixed left-0 right-0 bottom-0 h-16 bg-white shadow-lg-top sm:left-[16rem]"
    >
      <div
        class="w-full h-full flex justify-between items-center px-4 sm:px-10"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
