<script setup>
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg"

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <svg class="w-full h-full fill-current">
    <use :xlink:href="`${remixiconUrl}#ri-${props.icon}`"></use>
  </svg>
</template>
