// 此模組為 notifications 元件再封裝, 並使用(分別)具名匯出
// 提供開發人員不同的提示框類型, 讓其根據不同需要取用與操作

import { notify as baseNotify } from "@kyvg/vue3-notification"

// default notify
export function notify(title, text, options) {
  // 完整寫法
  // return baseNotify({ title: title, text: text, ...options })
  // 縮寫語法: 當key & value 同名時, 可以合併寫一次就好
  return baseNotify({ title, text, ...options })
}
// success notify
export function successNotify(title, text, options) {
  return notify(title, text, { ...options, type: "success" })
}
// warning notify
export function warningNotify(title, text, options) {
  return notify(title, text, { ...options, type: "warn" })
}
// error notify
export function errorNotify(title, text, options) {
  return notify(title, text, { ...options, type: "error" })
}
