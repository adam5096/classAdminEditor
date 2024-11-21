<script setup>
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg"

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
  isActive: {
    type: Function,
    default: () => false,
  },
})
</script>

<template>
  <button
    class="mr-1 w-7 h-7 p-1 rounded"
    :class="
      isActive()
        ? 'bg-violet-600 text-white'
        : 'hover:bg-violet-600 hover:text-white'
    "
    @click="props.action"
    :title="props.title"
  >
    <RemixIcon :icon="props.icon"></RemixIcon>
  </button>
</template>
