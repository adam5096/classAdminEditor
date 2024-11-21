// 此模組提供開發人員從專案的全部作用域中都可操作到提示框訊息

import { ref } from "vue"
// 輕量級 事件訂閱與觸發 library
import mitt from "mitt"

// 實例化 mitt 並根據未來途命名成 confirmEvents
const confirmEvents = mitt()

// 控制訊息提示窗的出現與隱藏
const showModal = ref(false)
// 提供訊息提示窗的大標題
const confirmTitle = ref("")

const handleSuccess = () => {
  // 主動觸發 success 事件
  confirmEvents.emit("success")
}
const handleCancel = () => {
  // 主動觸發 cancel 事件
  confirmEvents.emit("cancel")
}

// 對外提供唯讀變數
export function useConfirmModal() {
  return {
    showModal,
    confirmTitle,
    handleSuccess,
    handleCancel,
  }
}
export function useConfirm(title) {
  confirmTitle.value = title
  showModal.value = true

  // 事件success, cancel 發布處
  // 當 觸發 success 事件時, 此 promise 將得到 fulfilled 狀態 => 執行 resolve(true)
  // 當 觸發 cancel 事件時, 此 promise 也得到 fulfilled 狀態 => 執行 resolve(false)
  return new Promise((resolve) => {
    confirmEvents.on("success", () => {
      resolve(true)
    })
    confirmEvents.on("cancel", () => {
      resolve(false)
    })
  })
}
