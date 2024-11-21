<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3"
import StarterKit from "@tiptap/starter-kit"
import { provide, watch } from "vue"

import mitt from "mitt"
import Link from "./Link"

import Image from "@tiptap/extension-image"

// 修改元件標籤在屬性繼承到元件內部結構時的預設落點
// 屬性繼承會改為落在開發人員指定位置(記號 $attr)
defineOptions({
  inheritAttrs: false,
})

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
  id: String,
  modelValue: String,
  label: {
    type: String,
    default: "text",
  },
  error: String,
  wrapperClass: [String, Array, Object],
})

// 事件 bus 實例化
const editorEvent = mitt()

// 文章編輯器 實例化
const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit, Link(editorEvent), Image],
  editorProps: {
    attributes: {
      // prose 是編輯器插件預設樣式, 一定要有它
      class:
        "prose prose-sm prose-violet sm:prose sm:prose-violet focus:outline-none !max-w-full min-h-[300px]",
    },
  },
  onUpdate: () => {
    // HTML
    emits("update:modelValue", editor.value.getHTML())

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  },
})

// watch 監視的變數
// 如缺少響應式: 監視參數的語法為()=> props.modelValue
// 如具有響應式: 直接寫變數名稱
// 此處 value 中保存使用者輸入在編輯器上的內容所對應的 HTML
watch(
  () => props.modelValue,
  (value) => {
    if (editor.value.getHTML() === value) {
      return
    }

    editor.value.commands.setContent(value, false)
  },
)

// 因為此響應數據使用者眾多 EditorMenuBar, EditorMenuLink, 組件間關係橫跨深遠, 故使用  provide, inject
provide("editor", editor)
provide("editorEvent", editorEvent)
</script>

<template>
  <div :class="wrapperClass">
    <!-- 標題 -->
    <label
      :for="props.id"
      class="form-label"
      >{{ props.label }}
    </label>
    <div
      v-if="editor"
      class="form-input p-0 focus-within:border-violet-600 focus-within:ring-1 focus-within:ring-violet-600"
    >
      <!-- editor-menu-bar -->
      <EditorMenuBar></EditorMenuBar>
      <!-- editor-content  -->
      <editor-content
        :editor="editor"
        class="mt-2 px-3 py-2"
      />
    </div>
    <!-- 錯誤訊息 -->
    <div
      v-if="props.error"
      class="form-error"
    >
      {{ props.error }}
    </div>
  </div>
</template>
