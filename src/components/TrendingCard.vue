<script setup>
const props = defineProps({
  icon: String,
  label: String,
  value: [Number, String],
  isUp: Boolean,
  trending: [Number, String],
})
</script>

<template>
  <Card class="flex items-center px-5 py-3">
    <!-- icon -->
    <div
      class="w-10 h-10 flex justify-center items-center bg-violet-200 text-violet-600 rounded-full"
    >
      <HeroiconsOutlineEye v-if="props.icon === 'eye'" />
      <HeroiconsOutlineStar v-else-if="props.icon === 'star'" />
      <HeroiconsOutlineAnnotation v-else="props.icon === 'annotation'" />
    </div>
    <!-- 人次 -->
    <div class="ml-3 flex-grow">
      <h4 class="text-gray-400 text-sm font-normal tracking-wider">
        {{ props.label }}
      </h4>
      <div class="text-3xl font-semibold text-gray-800">{{ props.value }}</div>
    </div>
    <Trending
      :is-up="isUp"
      :value="trending"
      :percentage="true"
    ></Trending>
  </Card>
</template>
