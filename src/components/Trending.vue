<script setup>
// 接收 TrendingCard 的傳值
const props = defineProps({
  isUp: {
    type: Boolean,
    default: true,
  },
  value: [Number, String],
  percentage: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    v-if="props.isUp"
    class="flex items-center text-green-600 font-medium self-end"
  >
    <HeroiconsOutlineTrendingUp />
    <span class="ml-1">{{ props.value }}{{ percentage ? "%" : "" }}</span>
  </div>
  <div
    v-else
    class="flex items-center text-red-600 font-medium self-end"
  >
    <HeroiconsOutlineTrendingDown />
    <span class="ml-1">{{ props.value }}{{ percentage ? "%" : "" }}</span>
  </div>
</template>
