<script setup>
import { useVModel } from "@vueuse/core"

// const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: "asc",
  },
})

// 使用者所選擇的排序資料
const selected = useVModel(props)
// 1. const selected = props.modelValue
// 2. emit('update:modelValue')

// 排序功能所提供的選項來源: 排序方向
const options = [
  // asc => ascending 正序排列
  {
    value: "asc",
    label: "A-Z",
  },
  // desc => descending 倒序排列
  {
    value: "desc",
    label: "Z-A",
  },
]
</script>

<template>
  <Listbox v-model="selected">
    <div class="relative">
      <ListboxButton
        class="form-select pl-4 text-gray-600 text-left shadow rounded-md"
      >
        <span class="block truncate">
          排序 {{ selected === "asc" ? "A-Z" : "Z-A" }}</span
        >
      </ListboxButton>

      <TransitionZoom>
        <ListboxOptions
          class="absolute z-[1] w-full py-1 mt-1 overflow-auto rounded-md text-base bg-white shadow-lg max-h-60 ring-1 ring-black/5 focus:outline-none origin-top-right sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
          >
            <li
              class="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-800"
              :class="{ 'bg-gray-200': active }"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600"
              >
                <HeroiconsOutlineCheck
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </TransitionZoom>
    </div>
  </Listbox>
</template>
