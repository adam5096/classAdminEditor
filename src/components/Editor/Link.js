import Link from "@tiptap/extension-link"
// 改裝 tiptap 插件源碼
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { getAttributes } from "@tiptap/core"

export default function (editorEvent) {
  return Link.configure({
    // 點擊連結後關閉自動開啟新頁面
    openOnClick: false,
  }).extend({
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey("handleEmitSelectLinkEvent"),
          props: {
            handleClick: (view, pos, event) => {
              const attrs = getAttributes(view.state, "link")
              const link = event.target.closest("a")

              // const href = link?.href ?? attrs.href
              // const target = link?.target ?? attrs.target

              if (link) {
                editorEvent.emit("link-selected", attrs)
                return true
              }

              return false
            },
          },
        }),
      ]
    },
  })
}
