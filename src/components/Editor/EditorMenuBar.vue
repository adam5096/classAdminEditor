<script setup>
import { inject } from "vue"

// 後面改用 provide, inject 取代
// const props = defineProps({
//   editor: {
//     type: Object,
//     required: true,
//   },
// })

// 來自最頂層元件 Editor.vue 的數據
const editor = inject("editor")

const items = [
  {
    icon: "bold",
    title: "粗體",
    // 對當前圈選範圍html進行指定編輯
    action: () => editor.value.chain().focus().toggleBold().run(),
    // isActive() 函數紀錄當前內容是否經過編輯狀態: 如 h1, h2, link....
    isActive: () => editor.value.isActive("bold"),
  },
  {
    icon: "italic",
    title: "斜體",
    action: () => editor.value.chain().focus().toggleItalic().run(),
    isActive: () => editor.value.isActive("italic"),
  },
  {
    icon: "strikethrough",
    title: "刪除線",
    action: () => editor.value.chain().focus().toggleStrike().run(),
    isActive: () => editor.value.isActive("strike"),
  },
  {
    icon: "link",
    title: "連結",
    action: (url) => {
      // 如果 url 是 string => 新增連結
      if (typeof url === "string") {
        // update link
        editor.value
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run()
      }
      // url 非 string, 並且處在已經連結化狀態 => 刪除連結
      else if (editor.value.isActive("link")) {
        // 解除連結
        editor.value.chain().focus().extendMarkRange("link").unsetLink().run()
      }
    },
    isActive: () => editor.value.isActive("link"),
  },
  {
    type: "divider",
  },
  {
    icon: "h-1",
    title: "標題 1",
    action: () =>
      editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: () => editor.value.isActive("strike"),
  },
  {
    icon: "h-2",
    title: "標題 2",
    action: () =>
      editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: () => editor.value.isActive("strike"),
  },
  {
    icon: "paragraph",
    title: "文字",
    action: () => editor.value.chain().focus().setParagraph().run(),
    isActive: () => editor.value.isActive("paragraph"),
  },
  {
    icon: "image-line",
    title: "圖片",
    action: (url) => editor.value.chain().focus().setImage({ src: url }).run(),
  },
  {
    type: "divider",
  },
  {
    icon: "list-unordered",
    title: "無序列表",
    action: () => editor.value.chain().focus().toggleBulletList().run(),
    isActive: () => editor.value.isActive("bulletList"),
  },
  {
    icon: "list-ordered",
    title: "有序列表",
    action: () => editor.value.chain().focus().toggleOrderList().run(),
    isActive: () => editor.value.isActive("orderList"),
  },
  // {
  //   icon: "blockquote",
  //   title: "註釋區塊",
  //   action: () => editor.value.chain().focus().toggleBlockquote().run(),
  //   isActive: () => editor.value.isActive("blockquote"),
  // },
  {
    icon: "separator",
    title: "分隔線",
    action: () => editor.value.chain().focus().setHorizontalRule().run(),
  },
]
</script>

<template>
  <div
    class="sticky top-0 inset-0 z-10 px-3 py-2 flex items-center flex-wrap bg-white border-b border-gray-200 rounded-t-md"
  >
    <template
      v-for="(item, index) in items"
      :key="item.icon"
    >
      <div
        class="w-[2px] h-5 bg-gray-200 ml-2 mr-3"
        v-if="item.type === 'divider'"
        :key="`divider${index}`"
      ></div>

      <!-- link -->
      <EditorMenuLink
        v-else-if="item.icon === 'link'"
        v-bind="item"
      ></EditorMenuLink>
      <!-- image -->
      <EditorMenuImage
        v-else-if="item.icon === 'image-line'"
        v-bind="item"
      ></EditorMenuImage>

      <EditorMenuItem
        v-else
        v-bind="item"
      ></EditorMenuItem>
    </template>
  </div>
</template>
