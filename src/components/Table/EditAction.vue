<script setup>
const props = defineProps({
  to: String,
})
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-flex justify-center items-center w-8 h-8 text-gray-400 hover:text-violet-600 transition-colors"
  >
    <HeroiconsOutlinePencilAlt />
  </RouterLink>
</template>
