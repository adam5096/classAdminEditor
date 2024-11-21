<script setup>
import { useVModel } from "@vueuse/core"

const emit = defineEmits(["update:modelValue", "submit", "submit-draft"])

const props = defineProps({
  modelValue: Object,
  defaultImage: String,
  tagsAutocompleteItems: Array,
})

// 父層元件標籤 PostForm + 表單數據 form 雙向綁定
const form = useVModel(props)

const submit = () => {
  //
  emit("submit")
}

const submitDraft = () => {
  //
  emit("submit-draft")
}
</script>
<!--  -->
<template>
  <div class="grid gap-6 lg:grid-cols-12">
    <!-- 左側文章標題/內容 -->
    <div class="space-y-6 lg:col-span-8 xl:col-span-9">
      <!-- 文章標題元件 -->
      <TextInput
        label="文章標題"
        id="title"
        v-model="form.title"
      >
        <!-- error="請輸入標題，勿留白" -->
      </TextInput>

      <!-- 多行輸入元件 -->
      <!-- error="請輸入標題，勿留白" -->
      <!-- <TextareaInput
        label="文章內容"
        id="content"
        v-model="form.content"
        class="h-[200px]"
      >
    </TextareaInput> -->

      <Editor
        label="文章內容"
        id="content"
        v-model="form.content"
      ></Editor>

      <!-- 桌上電腦版 - 送出按鈕 -->
      <div class="hidden lg:flex lg:justify-end lg:space-x-4">
        <!-- 按鈕元件 -->
        <SecondaryButton @click="submitDraft">保存草稿</SecondaryButton>
        <PrimaryButton @click="submit">發布文章</PrimaryButton>
      </div>
    </div>

    <!-- 右測側邊欄 -->
    <div class="space-y-6 lg:col-span-4 xl:col-span-3">
      <!-- 上傳圖片元件 -->
      <ImageUpload
        label="縮圖"
        id="image"
        v-model="form.image"
        :default-image="defaultImage"
        image-class="aspect-w-16 aspect-h-9 rounded-md"
      >
      </ImageUpload>
      <!--  -->

      <!-- 簡介元件 -->
      <TextareaInput
        label="文章簡介"
        id="description"
        v-model="form.description"
      >
        <!-- error="請輸入標題，勿留白" -->
      </TextareaInput>

      <!-- 標籤元件 -->
      <TagsInput
        label="標籤"
        id="tags"
        v-model="form.tags"
        :autocomplete-items="tagsAutocompleteItems"
      >
        <!--  -->
      </TagsInput>

      <!-- 手機版 - 送出按鈕 -->
      <div class="grid grid-cols-2 gap-4 lg:hidden">
        <!-- 按鈕 -->
        <SecondaryButton @click="submitDraft">保存草稿</SecondaryButton>
        <PrimaryButton @click="submit">發布文章</PrimaryButton>
      </div>
    </div>
  </div>
</template>
