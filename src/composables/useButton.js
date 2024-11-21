// 此模組提供開發人員使用 useButton 時, 根據傳入參數的不同, 決定其作為超連結 <a> 標籤, 或作為 <RouterLink to=""> 標籤來使用

import { ref } from "vue"

export default function useButton(props) {
  // 控制 tag 變數最終取得的可選值, 並保存起來
  const getTag = () => {
    if (props.is) {
      return props.is
    } else if (!props.is && props.to) {
      return "RouterLink"
    }
    return "button"
  }
  // 根據 getTag()返回值決定 tag 最終值
  const tag = ref(getTag())

  //  根據條件決定 (下游) buttonType 最終值
  const buttonType = ref(
    props.type || (tag.value === "button" ? "button" : null),
  )

  return { tag, buttonType }
}
