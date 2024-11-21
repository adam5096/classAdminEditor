🌱💞️📫⚡🚀🔧🚫🏪
🔗💻📝🔩🪜⚙📚🡄🡅🡆🡇🚜
🛫🌏🎒📦🎯❗🏹
👋✍👉👆👈👇👍👊
😄🧑‍🚀🧞👀🧑‍💻
🪵🌐✅
⭐✨

>[!NOTE]
>NOTE

>[!TIP]
>TIP

>[!IMPORTANT]
>IMPORTANT

>[!WARNING]
>WARNING

>[!CAUTION]
>CAUTION

照著影片或文件寫程式, 出現錯誤找不到出錯源頭
重做兩三次也找不到

前中期:
1. 語法錯誤: 對主要語言的語法使用不熟悉, 變數&函數的命名與使用方式錯誤, 函數所需要的參數的數量, 型別, 位置不正確等等...
2. 邏輯錯誤: 語法通過檢查, 但執行結果與期待結果不同...
3. 粗手指拼寫錯誤: 多打或少打1字, ,字母位置擺反 字母大小寫打反, 使用到不允許的特殊符號, 自訂變數命名重疊到該語言保留字&關鍵字等等...
4. 輸入法錯誤: 全形, 半形錯誤, 特別是全形空白鍵或多餘的無意義空白鍵
5. 編輯器或打包工具環境設定不正確或發生衝突

中後期
1. 使用的第三方套件的語法版本與影片所展示版本不一致: 太過老舊或太新, 都可能直接出錯, 要檢查官方文件的版本遷移細節說明
2. 良好除錯習慣尚在建立中: 缺少語法檢查, 風格檢查等插件, 缺少測試環節

使用AI協助除錯的幾個問法:
(首先貼上程式碼之後 )請問這段程式...
**錯誤類**
有哪些明顯錯誤 ?
有哪些潛在錯誤 ?

**改善空間類**
變數與函數命名 ?
註解?
可讀性?
維護性?
記憶體使用?
資訊安全?
SEO?

**最佳寫法類**
有沒有其他最佳寫法 ?

**測試類**
對應他的測試語法要怎麼寫 ?


# 第一章 行前準備 108 mins
## 單元 1 - 介紹
## 單元 2 - 說明
## 單元 3 - vite + vue

<https://vite.dev/guide/>

## 單元 4 - Tailwind CSS

<https://tailwindcss.com/docs/guides/vite#vue>


## 單元 5 - [更新] Vite 3 升級指南


## 單元 6 - 安裝 Tailwind CSS 相關套件
@tailwindcss/typography  
<https://github.com/tailwindlabs/tailwindcss-typography>

<!-- wow -->
<blockquote style="background-color:yellow;color:green">
        <p>Why is Tailwind removing the default styles on my <code>h1</code> elements? How do I disable this? What do you mean I lose all the other base styles too?</p>
</blockquote>

@tailwindcss/aspect-ratio  
<https://github.com/tailwindlabs/tailwindcss-aspect-ratio>

**因為不是所有 html 元素都自帶固定寬高比的特性,**  
aspect-ratio 提供我們可以對缺少該特性的元素, 對其設定具有範圍性(上、下限)的固定寬高比


@tailwindcss/forms  
<https://github.com/tailwindlabs/tailwindcss-forms>
提供一基礎表單樣式可以快速建立樣板, 隨後也能依照設計需求去做改變

## 單元 7 - postcss-import

<https://tailwindcss.com/docs/using-with-preprocessors>

`npm install -D postcss-import`

預處理器提供的最有用的功能之一是能夠將 CSS 組織成多個文件，並在建置時透過@import提前處理語句（而不是在瀏覽器中）將它們組合起來。

## 👀 官網文件語法有出錯
<https://tailwindcss.com/docs/using-with-preprocessors>

```jsx
// plugins 後第一層結構正確應該是 [] , 官網錯寫成 {}
plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ]
```

Error: Dynamic require of 
"file:///C:/Users/User/Desktop/Lucas/adam-admin/node_modules/@tailwindcss/forms/src/index.js" 
is not supported

## ⚡⚡⚡ 修改 tailwind.config.js 成 tailwind.config.cjs，和 postcss.config.js 改成 postcss.config.cjs。

4. 為什麼在 Tailwind 3.1 和 Vite 3 的版本之後執行 `npx tailwindcss init -p`，tailwind.config.js 變成了 tailwind.config.cjs 檔? 會有什麼影響嗎?
剛好有同學在提問區問關於這個部分的問題，所以我就在這裡和大家分享出來~

下面是回答：

現在的 JS 裡面有兩種常見的模組架構，CommonJS 和 ESM，CommonJS 是 Node.js 中主要的寫法 (使用 require() 引入的方式)，而 ESM 則是 Vite 現在使用的架構 (就是在課程中用 import ... from ... 來引入的方式)。

而 Vite 3 中的更新，為了能讓 ESM 更全面覆蓋專案，在 package.json 增加了 "type": "module"，讓專案中的 .js 檔在 Node.js 中被視為 ESM 模組，  
然後如果 tailwind.config 使用 .js 檔的話，也會被視為 ESM。

但 tailwind.config 的內部寫法還是使用 CommonJS，用 ESM 的方式引入會輸出錯誤 (不支持...)，  
所以在 Tailwind 3.1 更新之後，會自動判斷有沒有 "type": "module"，有的話就會產生 tailwind.config.cjs，強制使用 CommonJS 的方式引入。

而影響方面，因為在 tailwind.config.cjs 都還是使用 CommonJS，原本的寫法基本上是不會受到影響的。

## 單元 8 - 專案設定

導出顏色 - tailwind.config.js  
安裝字形 /@base font-light  
jsconfig.json /alias

**導出顏色 - tailwind.config.js**
<https://tailwindcss.com/docs/customizing-colors>

<hr />

**安裝字形 /@base font-light**
<https://fonts.google.com/noto/specimen/Noto+Sans+TC>

<hr />

**jsconfig.json /alias**
<https://code.visualstudio.com/docs/languages/jsconfig#_using-webpack-aliases>

## 單元 9 - vite-plugin-pages - 檔案驅動的 vite 路由套件

像是 NUXT 好用一般: 隨檔案目錄位置與層級, 自動生成相對應路由 ( path 與畫面的對應關係)

<https://github.com/hannoeru/vite-plugin-pages>

## 單元 10 - unplugin-vue-components - 自動加載(匯入) vue 組件

省去書寫匯入語具 `import ... from ...`

<https://github.com/unplugin/unplugin-vue-components>


## 單元 - 11 - unplugin-icons - 快速使用 100+ 套件庫 & Heroicons 介紹

unplugin-icons  
<https://github.com/unplugin/unplugin-icons>

Icones  
<https://icones.js.org/>

HeroIcones Outline - Icones  
<https://icones.js.org/collection/heroicons-outline>

HeroIcons 官網  
<https://heroicons.com/>

**install**  
Plugin  
`npm i -D unplugin-icons`

Icons Data  
`npm i -D @iconify/json`

## 單元 - 12 - Headless UI - 適用於 Tailwind CSS 的無樣式組件庫

<https://headlessui.com/v1/vue/menu>

`npm install @headlessui/vue`

## 單元 - 13 - Tailwind UI - Tailwind CSS 官方的組件懶人包

<https://tailwindui.com/>


## 單元 - 14 - VueUse - Vue Composition API 的功能大寶箱

<https://vueuse.org/>

常用 vue 工具的一個集合

`npm i @vueuse/core`

<hr>

**best practice**  
<https://vueuse.org/guide/best-practice.html>



# 第二章 佈局篇 97 mins
請問 vite.config.js 檔名是 js 結尾,  
為何內容可使用 common JS 模組規則中的匯出語法 module.export 和匯入語法 require,  
並且不與 js 檔案格式發生衝突呢? 請用中文回答謝謝

cookie, localStorage, sessionStorage

**cookie 會員卡**
會員卡
1. 由會員方(消費者)保管
2. 店家辨識會員卡上紀錄, 提供相對應折扣與服務等等


| 比較 | localStorage                     | sessionStorage                                           |
| :--- | :------------------------------- | :------------------------------------------------------- |
|      |                                  | 會過期的localStorage版本                                 |
| 特性 | 關閉瀏覽器後狀態仍存活           | 一次性紀錄, 快速過期, 不被永久紀錄, 關閉瀏覽器後馬上消失 |
| 場景 | 使用者常用快取狀態, 偏好文字大小 | 會員機制                                                 |

## 單元 1 - 頁面布局 - 桌機版本

**overflow-x-auto 寫在父元素**  
當子元素寬度溢出父元素時, 此 class 可形成一埋入式拖拉窗戶讓使用者得以觀看溢出的內容


>[!WARNING]
>overflow-x-auto 使用限制  
>有開啟 overflow-x-auto 元素的祖先元素必須設定成定寬, 不能是預設寬度 auto  
>最常用的解法是給祖先元素給定 min-w-0


## 單元 2 - 頁面布局 - 手機版本

**flex-shrink-0**  
將壓縮比設定成 0, 使元素不會被鄰居寬度擠壓

<hr>

先做好桌機版本 UI, 再做手機版本 UI

<hr>

```html
<div class="mt-2 py-1 sm:hidden">
  <!-- flex 往內層結構放 -->
    <div class="flex items-center px-4 py-3">
        <HeroiconsOutlineUsers class="w-8 h-8 rounded-full mr-2" />
        <div class="font-medium tracking-wide">I am Adam</div>

        <!-- 未來要新增結構時的接入點, 這裡會同時受到 flex 排版作用 -->
    </div>
</div>
```

## 單元 - 3 - 抽離選單資料

**`<component>`**  
A "meta component" for rendering dynamic components or elements.

<https://vuejs.org/api/built-in-special-elements.html#component>

<hr>

## 單元 - 4 - 用戶功能選單

問: 請問headless ui 與 tailwind css 是甚麼關係?謝謝

## Headless UI 與 Tailwind CSS 的關係

**Headless UI** 和 **Tailwind CSS** 都是前端開發中非常流行的工具，但它們扮演著不同的角色，共同合作能打造出功能強大、美觀的使用者介面。

### Headless UI：無頭 UI 組件庫

* **定義：** Headless UI 是一個完全可自定義的 UI 組件庫，提供了一組無樣式的、可訪問的 HTML、JavaScript 和 TypeScript 組件。
* **特性：**
    * **無樣式：** 沒有預設的樣式，讓開發者可以完全掌控組件的外觀，與自己的設計系統完美結合。
    * **可訪問性：** 內建了許多無障礙功能，確保應用程式對所有使用者都是友善的。
    * **完全可自定義：** 可以根據專案的需求，自由地調整組件的行為和外觀。
* **角色：** 提供了構建使用者介面所需的基礎組件，例如按鈕、菜單、模態框等。

### Tailwind CSS：實用優先的 CSS 框架

* **定義：** Tailwind CSS 是一個功能強大的低層級 CSS 框架，提供了一組高度可自定義的 CSS 類別。
* **特性：**
    * **實用優先：** 提供了大量的實用類別，可以快速地為元素添加樣式，例如字體大小、顏色、間距等。
    * **高度可自定義：** 可以自定義主題，以符合專案的設計需求。
    * **響應式設計：** 內建了響應式設計功能，可以根據不同螢幕尺寸調整樣式。
* **角色：** 提供了快速建立樣式的工具，讓開發者可以輕鬆地為 HTML 元素添加樣式。

### 兩者之間的關係

* **互補：** Headless UI 提供了組件的結構和行為，而 Tailwind CSS 則提供了一套完整的 CSS 類別，用於為這些組件添加樣式。
* **協同工作：** 可以將 Headless UI 的組件與 Tailwind CSS 的類別結合起來，快速構建出功能強大、美觀的使用者介面。
* **靈活性：** 這種組合提供了極高的靈活性，讓開發者可以完全掌控應用程式的樣式和布局。

### 舉例說明

假設要建立一個簡單的按鈕，可以使用 Headless UI 提供的 `<button>` 組件，然後使用 Tailwind CSS 的類別來為這個按鈕添加樣式：

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  點擊我
</button>
```

在這段程式碼中：

* `<button>` 是 Headless UI 提供的組件。
* `bg-blue-500`, `hover:bg-blue-700`, `text-white`, `font-bold`, `py-2`, `px-4`, `rounded` 都是 Tailwind CSS 提供的類別，用於控制按鈕的背景顏色、文字顏色、字體粗細、內外邊距等。

### 總結

Headless UI 和 Tailwind CSS 的結合, 為前端開發者提供了一種高效、靈活的方式來構建使用者介面。Headless UI 提供了可訪問且可自定義的組件, 而 Tailwind CSS 則提供了一套強大的 CSS 工具, 讓開發者可以快速地為這些組件添加樣式。這種組合可以大大提高開發效率，同時也確保應用程式的品質。

<hr>

**Menu (Dropdown)**  
Menus offer an easy way to build custom, accessible dropdown components with robust support for keyboard navigation.

<https://headlessui.com/v1/vue/menu>

```vue
<transition
  enter-active-class="transition duration-100 ease-out"
  enter-from-class="transform scale-95 opacity-0"
  enter-to-class="transform scale-100 opacity-100"
  leave-active-class="transition duration-75 ease-in"
  leave-from-class="transform scale-100 opacity-100"
  leave-to-class="transform scale-95 opacity-0"
>

</transition>

```
<hr>

動態元件標籤`<component>`的使用場景

```jsx
// 使用者名稱選單展示的資料來源 - Start
const userMenuItems = [
  {
    tag: "RouterLink",
    to: "/setting",
    text: "個人中心",
  },
  {
    tag: "button",
    text: "登出",
    mobile: true,
    onClick: () => {
      // 登出之前的其他API操作
      router.push("/login")
    },
  },
]

```

```html
<component
  :is="item.tag"
  class="flex items-center w-full px-4 py-3 text-violet-400 hover:text-white"
  @click="item.onClick"
>
  {{ item.text }}
</component>
```

# 第三章 元件篇 133 mins
## 單元 1 - 按鈕組件

**Form Layouts**  
Use these Tailwind CSS form and form layout components to build things like settings screens in your application. These form components are designed and built by the Tailwind CSS team, and include a variety of different styles and layouts.

<https://tailwindui.com/components/application-ui/forms/form-layouts>


<hr>

## 請問 tailwind css 的 focus 和 focus-visible差別在哪?謝謝

在 Tailwind CSS 中，`:focus` 和 `:focus-visible` 是兩個不同的聚焦狀態修飾符，它們在應用樣式時有著明顯的差異。

## **`:focus`**
- **定義**: 當元素獲得焦點時（無論是通過鍵盤導航還是滑鼠點擊），`:focus` 會被觸發。
- **用途**: 通常用於需要明確反饋的互動元素，如按鈕、輸入框等。例如，當用戶使用滑鼠點擊一個按鈕或使用 Tab 鍵導航至某個輸入框時，相關的樣式會被應用。

## **`:focus-visible`**
- **定義**: 這個修飾符僅在使用鍵盤進行導航時觸發，而不會因為滑鼠點擊而觸發。這意味著只有當用戶使用鍵盤（如 Tab 鍵）來聚焦元素時，樣式才會生效。
- **用途**: 主要用於提升可訪問性，避免在使用滑鼠時出現不必要的聚焦樣式。例如，當用戶使用滑鼠點擊按鈕時，不會顯示聚焦樣式，但當他們使用鍵盤導航時，則會顯示。

### **比較表**

| 特徵     | `:focus`               | `:focus-visible`               |
| -------- | ---------------------- | ------------------------------ |
| 觸發方式 | 鍵盤或滑鼠             | 僅鍵盤                         |
| 主要用途 | 提供所有聚焦狀態的反饋 | 提升可訪問性，減少不必要的樣式 |
| 使用情境 | 所有互動元素           | 主要針對鍵盤導航的元素         |

### **總結**
選擇使用 `:focus` 還是 `:focus-visible` 取決於你希望如何處理聚焦狀態的可視化。在設計可訪問性良好的界面時，通常建議使用 `:focus-visible` 以避免對使用滑鼠的用戶造成干擾[1][2][3]。


<hr>

**Space Between**  
Utilities for controlling the space between child elements.

<https://tailwindcss.com/docs/space>

<hr>

**Letter Spacing**  
Utilities for controlling the tracking (letter spacing) of an element.

<https://tailwindcss.com/docs/letter-spacing>


## 單元 2 - 常用表單元件

resize-none 禁用滑鼠拖拉設定多選框寬高

對單選框、多選框設定其文字顏色樣式時, 等同於修改其勾選狀態的 icon 顏色

<hr>

<https://github.com/tailwindlabs/tailwindcss-forms?tab=readme-ov-file>

因為 tailwind/form 提供快速簡單的樣式預設作用在表單類元素身上  
當希望非表單元素也能使用到 tailwind/form 中提供的樣式時  
可以做下列設定

```jsx
// tailwind.config.js
plugins: [
  require("@tailwindcss/forms")({
    strategy: 'base', // only generate global styles
    strategy: 'class', // only generate classes
  }),
],
```

使用該 base 策略時，表單元素會全域設定樣式，並且不會 form-{name} 產生任何類別。

使用此 class 策略時，表單元素不會全域設定樣式，而必須使用產生的類別設定樣式 form-{name}。

## 單元 3 - 彈出視窗元件

在元件標籤上使用 v-model 雙向綁定時

```html
<!-- vue 2 -->
<MyComponent v-model="text">
<MyComponent v-bind:value="text" @input="MyFunction">

<!-- vue 3 -->
<MyComponent v-model="text">
<MyComponent v-bind:modelValue="text" @update:modelValue>
```

<hr>

**defineProps**  
<https://vuejs.org/guide/components/props.html#props-declaration>

**defineEmits**  
<https://vuejs.org/guide/components/events.html#declaring-emitted-events>

<hr>

`TransitionRoot` 元件可以自動去同步所有後代 `TransitionChild` 的顯示與隱藏, 並為其套用過渡動畫

<hr>

## /src/components/Modal.vue>{} script setup>[]isOpen
在 vue 3 裡 : useVModel 在背景自動抓取 'modelValue',emit 兩值作為預設參數, 當開發人員沒有修改或自訂其他參數名稱的話, 可省略這兩個參數免於書寫

<hr>

```html
  <template v-slot:footer>defaultcontent</template>

  <!-- 可簡寫 -->
  <template #footer>defaultcontent</template>
```

## 單元 4 - 確認視窗元件 - 樣式

  在 App.vue 當中使用 AppConfirmModal 元件

<hr>

```jsx
// /src/pages/index.vue
useConfirm("確定刪除嗎").then((result) => {
    console.log(result)

    if (result) {
      console.log("刪除成功")
    }
  })
```

<hr>

**useConfirmModal.js**
```jsx
// src/composables/useConfirmModal.js

import { ref } from "vue"
// 輕量級 事件訂閱與觸發 library
import mitt from "mitt"

// 實例化 mitt 並根據未來途命名成 confirmEvents
const confirmEvents = mitt()

const showModal = ref(false)
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

```

## 單元 5 - 確認視窗元件 - 功能
需求: 在後台全部範圍內點擊任何一個刪除按鈕時, 都要彈出通知視窗



**技術概念 & 施作與方式 :**  
1. 準備一個全域層級的js模組 `AppConfirmModal.js`

2. 在其內部創建並對外匯出控制對話窗出現與隱藏的響應式變數 `showModal`

3. 並在全專案範圍內任何一處具有刪除功能的按鍵元素上面(html結構處), 綁上並監聽點擊事件後, 要能修改 showModal

**施工資料夾 :**  
.src/section/AppConfirmModal.vue

.src/composable/AppConfirmModal.js

<hr>

**mitt 🥊**  
Tiny 200 byte functional event emitter / pubsub.

<https://github.com/developit/mitt>

<hr>

## 單元 6 - 訊息提示元件 - 樣式

**Vue.js notifications**  
Vue 3 notification library 💬

<https://github.com/kyvg/vue3-notification>

<hr>

**notification 的 DOM**
```html
<div class="vue-notification-group" style="width: 300px; top: 0px; right: 0px;">
    <div>
      <div class="vue-notification-wrapper" data-id="4" style="transition: 300ms;">
        <div class="relative mx-4 mb-4 bg-white rounded-lg shadow-lg"><!-- icon -->
          <div>
            <div>更新成功</div>
            <div>已經更新成功了</div><button type="button">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
```

<hr>

**Individual sides**  
Use the border-t-*, border-r-*, border-b-*, and border-l-* utilities to set the border color for one side of an element.

<https://tailwindcss.com/docs/border-color#individual-sides>

<hr>

如何做出 notifications 單邊帶色 + 圓角框?  
結構 + CSS: 套兩層 div, 子層負責塗色; 父層把溢出內容裁切

```html
<!-- overflow-hidden 裁切子層溢出內容; 切圓角 -->
<div class="relative flex mx-4 mb-4 bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- 負責塗色就好 -->
    <div class="border-l-4 border-green-500">
      <!-- icon -->
    </div>
</div>
```

<hr>

```html
<!-- hover 常用組合樣式 -->
<div class="hover:text-gray-500 transition-colors duration-100">
</div>
```

<hr>

**Type**  
Set the type of a notification (warn, error, success, etc) by adding a type property to the call:
```jsx
this.$notify({ type: "success", text: "The operation completed" });
```

<https://github.com/kyvg/vue3-notification?tab=readme-ov-file#type>

<hr>

:class="`notification - ${item.type}`"

## 單元 7 - 訊息提示元件 - 功能

再封裝 notifications, 簡化其使用流程

/src/composables/useNotification.js

開發人員在使用上, 只需關心函數使用位置、標題、訊息內容, 

# 第 4 章 顯示資料篇  213 mins - 文章列表  
## 單元 1 - 文章列表 - 表格樣式

**inline-block**  
<https://www.w3schools.com/css/css_inline-block.asp>

<hr>

**inline-flex**  
<https://www.w3schools.com/cssref/pr_class_display.php>

<hr>

**whitespace-nowrap**

使文字不會換行, 始終處在同一橫行(row)

<hr>

**Space Between**  
Utilities for controlling the space between child elements.

<https://tailwindcss.com/docs/space>

<hr>

## 單元 2 - 文章列表 - 元件化

**結構, 樣式**

**元件化分層**  
決定(父層)哪個元件串接 API & 保管資料
(子層)哪個專注在使用資料



<hr>

/src/pages/post.vue  
/src/components/PageHeader.vue

<hr>

/src/components/Card.vue  
post.vue 當中, 處理 `<table>` 父層的 `<div>` 的class,
現在將此 class 的樣式內容拆分成兩部分,
一部分樣式留在原來位置上,
另一部分樣式寫在 card 元件內部

<hr>

經API取回的資料 columns, data 保存在 post.vue 這層元件

Table.vue  
此場景使用到的元件之間傳遞共享數據技術為:

**父傳子 defineProps({})**
```jsx
// /src/components/Table.vue
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})
```

**子傳父 作用域插槽**
```html
<!-- 父 /src/pages/post.vue -->
<template #column-title="{ record, value }">
  <RouterLink
    :to="`${record.id}`"
    class="link font-normal"
    >{{ value }}</RouterLink
  >
</template>

<template #column-visits="{ value }">
  <HeroiconsOutlineEye class="inline-block w-4 h-4" />
  {{ value }}
</template>
<template #column-tags="{ value }">
  <span class="inline-flex space-x-2"
    ><span
      v-for="tag in value"
      :key="tag"
      class="px-2 py-0.5 bg-violet-600 text-white font-normal tracking-wide rounded-full"
      >{{ tag }}</span
    >
  </span>
</template>

<!-- 子 /src/components/Table.vue -->
 <slot
    :name="`column-${column.key}`"
    :column="column"
    :record="record"
    :value="record[column.key]"
  >
    {{ record[column.key] }}
  </slot>
```


<hr>

處理當資料變數 data 為空的時候(出於任何原因沒有保存到資料時), 畫面的呈現內容

### 記錄問題現象&解法

在處理`當沒有資料時應該呈現何種內容`時,
v-for 沒有寫在正確的標籤位置(層級), 使得其沒有遵循特定條件渲染特定內容


## 單元 3 - 文章列表 - 編輯/刪除按鈕

EditActions

DeleteActions

async, await是 promise,then的語法糖

規劃讓 Table.vue集中並握有設定資料的操作空間

## 單元 4 - 文章列表 - 分頁器

**Vue3 - pagination**
<https://github.com/HENNGE/vue3-pagination>

<hr>

下列 `defineProps` 語法是一個既可以同時承接來自父元件傳值、並向子元件傳值的語法
關鍵在要設定default 數值

```jsx
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalPage: {
    type: Number,
    default: 10,
  },
})
```

<hr>

當前頁, 預備頁(倉庫頁)

```css
/* 當滿足某個排除條件時候 */
&:not()
```

<hr>

修改 SVG 圖片顏色需要從標籤中找到 fill 這個欄位(屬性)


## 單元 5 - 表格多行操作 - 核取方塊元件

snippet  
<https://code.visualstudio.com/docs/editor/userdefinedsnippets>

emmet  
<https://code.visualstudio.com/docs/editor/emmet>


AI prompt: 請問vs code 中所指的 emmet 與 snippet, 他們兩者相近與區別的地方有哪些? 謝謝

<hr>

AI prompt: 請問 input 元素中的哪些操作會被分類成為 change 事件? 謝謝

在 HTML 的 `<input>` 元素中，**change 事件** 是一種特定的事件，當用戶對元素的值進行修改並且滿足某些條件時會被觸發。以下是一些會觸發 change 事件的操作：

## **觸發 change 事件的操作**

- **失去焦點後的文本輸入**：當用戶在文本框中輸入內容後，如果該元素失去焦點（例如，點擊其他地方或按下 Tab 鍵），則會觸發 change 事件[1][4][10]。

- **選擇下拉選項**：在 `<select>` 元素中，當用戶選擇一個選項並且該元素失去焦點時，change 事件會被觸發[6][11]。

- **勾選或取消勾選複選框**：對於 `<input type="checkbox">` 和 `<input type="radio">` 元素，當用戶勾選或取消勾選這些選項時，change 事件會立即觸發[2][6][19]。

- **提交表單**：在某些情況下，當用戶提交表單時，所有的 change 事件也會被觸發，這取決於表單的設置和用戶的操作[5][10]。

- **使用日期選擇器**：對於 `<input type="date">` 元素，當用戶選擇一個日期並且該元素失去焦點時，change 事件會被觸發[6][19]。

## **總結**

change 事件主要在用戶完成對輸入元素的修改並且該元素失去焦點時觸發，這使得它與 input 事件有所不同，後者會在每次值變更時立即觸發。了解這些觸發條件有助於開發者更好地管理用戶輸入和表單行為。

<hr>

**Input Checkbox indeterminate Property**  
<https://www.w3schools.com/jsref/prop_checkbox_indeterminate.asp>

<hr>

/src/components/SelectRowCheckbox.vue

/src/components/SelectAllCheckbox.vue

onMounted,
watch,

:class="{ 'bg-violet-200': rowSelectStatus[i] }"


## 單元 6 - 表格多行操作 - 多行選取狀態

**施做概念**

1. 全選框 view <=> 全選框 state

2. 全選框 state <=> 各單選框 state

3. 各單選框 state <=> 各單選框 view


**施作流程: 根據引發改變的方向性區分**

先做全選框改變影響各單選框, 後做各單選框改變影響全選框

## 單元 7 - 表格多行操作 - 多行操作欄位

src/components/table/ActionBar.vue

src/styles/components.css

await,
nextTick,


```jsx
 // 當勾選各單選框後, 修改 selectAllState數值, 展示操作盤
  watch(selectAllState, selectAllState => {
    showActionsBar.value = ['all', 'some'].includes(selectAllState)
  })
```

```jsx
// 操作盤中的刪除文章按鈕
const handleDeleteSelectedPost = (ids) => {
  // 刪除: 留下那些 record.id !=== ids 的 record => 只拔掉被勾選 tr
  data.value = data.value.filter((record) => !ids.includes(record.id))
  successNotify("文章刪除成功")
}
```

```html
<!-- 恰好以陣列長度等於已勾選資料筆數 -->
<div class="text-gray-600 text-sm sm:text-base">
      已選取 {{ selectedIds.length }} 筆資料
</div>
```

## 單元 8 - 篩選選單 & 搜尋輸入框 - 樣式

篩選,
搜尋,
清除,
排序


<hr>

**Popover**  
Popovers are perfect for floating panels with arbitrary content like navigation menus, mobile menus and flyout menus.

<https://headlessui.com/v1/vue/popover>


<hr>

在視窗寬高伸縮過程中,遇到彈性單元(元素)寬度擠壓時, 可設定此樣式停用壓縮(使元素寬度不受擠壓)  
`flex-shrink-0`

<hr>

彈性元素在可用空間前提下縉可能伸長  
`flex-grow`

<hr>

在CSS中，选择器的语法非常重要，尤其是在处理类选择器时。你提到的两种选择器语法 `.class_A.class_B` 和 `.class_A, .class_B` 之间有显著的区别。

## **选择器的区别**

1. **`.class_A.class_B`**:
   - 这个选择器选择同时具有 `class_A` 和 `class_B` 的元素。换句话说，只有当一个元素同时被赋予这两个类时，它才会被选中并应用相应的样式。
   - 例如，如果有一个HTML元素如下：
     ```html
     <div class="class_A class_B">内容</div>
     ```
     只有这个元素会被 `.class_A.class_B` 选择器选中。

2. **`.class_A, .class_B`**:
   - 这个选择器选择所有具有 `class_A` 或 `class_B` 的元素。也就是说，只要元素中包含其中一个类，它就会被选中。
   - 例如，以下两个HTML元素都会被这个选择器选中：
     ```html
     <div class="class_A">内容A</div>
     <div class="class_B">内容B</div>
     ```

## **总结**

- 使用 `.class_A.class_B` 时，样式只会应用于同时包含这两个类的元素。
- 使用 `.class_A, .class_B` 时，样式会应用于所有包含任一类的元素。

这种选择器的使用方式在CSS中非常常见，能够帮助开发者精确控制样式的应用范围。

<hr>

```html
<input
    type="date"
    class="form-input rounded-l-none"
  />

<input
    type="number"
    class="form-input rounded-l-none"
  />
```

<hr>


**Space Between**  
Utilities for controlling the space between child elements.

<https://tailwindcss.com/docs/space>

`space-x-2`
`space-y-2`

## 單元 9 - 篩選選單 & 搜尋輸入框 - 功能

**Transform Origin**  
Utilities for specifying the origin for an element's transformations.

<https://tailwindcss.com/docs/transform-origin>

`origin-top-left`

<hr>

```html
<!-- radio + value 同時設定後, 才完整實現單選框'單選'效果 -->
<label class="flex items-center">
    <input
      type="radio"
      class="form-radio mr-1"
      v-model="form.soft_delete"
      value="contains"
    />
    <span>包含軟刪除</span>
  </label>
```

<hr>

` @keyup.enter="submitSearch"`


## 單元 9 - 排序選單

const selected = useVModel(props)

<hr>

在元件標籤上使用 v-model 預設參數雙向綁定數據

useVModel(props) 此函數在只攜帶props一個參數時會同時處理一連串操作如下:
0. 註冊預設v-model監聽事件 @update:modelValue
1. 自動讀取 props.modelValue 當中數值
2. 激發並通知父層監聽事件  update:modelValue

```jsx
// 一個 vueUse library 當中的函數, 在元件標籤上使用 v-model 綁定雙向資料時可簡化操作
useVModel(props) // 等價於下面3行指令

const emit = defineEmits(['update:modelValue'])
const selected = props.modelValue
emit('update:modelValue')
```

## 單元 10 - 細節調整

**Top / Right / Bottom / Left**  
Utilities for controlling the placement of positioned elements.

<https://tailwindcss.com/docs/top-right-bottom-left>

<hr>

當 post.vue 內的 data 缺少資料時, 全選框應該停用不讓使用者勾選


# 第 5 章 顯示資料篇 104 mins - 首頁 & 圖表 
## 單元 1 - 首頁 - 上排資料統計卡片

**Grid Template Columns**  
Utilities for specifying the columns in a grid layout.

<https://tailwindcss.com/docs/grid-template-columns>

<hr>

**Gap**  
Utilities for controlling gutters between grid and flexbox items.

<https://tailwindcss.com/docs/gap>


<hr>

**Grid Column Start / End**  
Utilities for controlling how elements are sized and placed across grid columns.

<https://tailwindcss.com/docs/grid-column>

`col-span-12`

<hr>

**Letter Spacing**  
Utilities for controlling the tracking (letter spacing) of an element.

<https://tailwindcss.com/docs/letter-spacing>

`tracking-wider`

<hr>

**Align Self**  
Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis.

<https://tailwindcss.com/docs/align-self>

`self-end`

<hr>

/src/components/TrendingCard.vue


/src/components/Trending.vue  
trending元件本質上由兩份結構相同但樣式不同的內容並排而成

分別用vif, v-else 取得外部傳進來的props後

若props滿足一條件則渲染A結構, 若props不滿足條件則渲染B結構

<hr>


## 單元 2 - 首頁 - 第二排圖表 | Chart.js 介紹 & 使用

>[!IMPORTANT]
>課堂中老師所示範 chart.js 文件版本 為 3.6.0

<https://www.chartjs.org/docs/latest/getting-started/usage.html>

<hr>

/src/pages/index.vue

```jsx
const labels = [
  "11/11(一)",
  "11/12(二)",
  "11/13(三)",
  "11/14(四)",
  "11/15(五)",
  "11/16(六)",
  "11/17(日)",
]

const data = {
  labels: labels,
  datasets: [
    {
      label: "11/11 - 11/17",
      data: [0,10,5,2,20,60,180], // 陣列成員數量與上方 labels 陣列成員數量一致
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
    },
  ],
}
```

<hr>

**Specific changes**  
`scales[id].grid.drawBorder` has been renamed to `scales[id].border.display`

<https://www.chartjs.org/docs/latest/migration/v4-migration.html>

<hr>

溢出來, 塌進去

<hr>

>[!IMPORTANT]
>`min-w-0`, `min-h-0`
>
>當網格元素有`auto的寬高`而溢出網格容器時, 我們要在**網格容器結構層**加上 `min-w-0` 或 `min-h-0`, 這樣瀏覽器才知道如何去定位

<hr>

不知道你對照著影片或文件寫的?我自己遇過的問題如下, 希望對你有幫助


## 單元 3 - 首頁 - 封裝圖表邏輯

施工資料夾: `src/composables/useChart.js`

<hr>

**vs code 快捷鍵**  
ctrl + p => 快速查找最近使用過的檔案  
ctrl + shift + p => 開啟 vs code 常用功能鍵

<hr>

someObj.map(()=>{}) 通常用來對物件中每位成員做相同處理: 老師展示對每個物件成員重新排它們列欄位與值

<hr>

**unref()**  
Returns the inner value if the argument is a ref, otherwise return the argument itself. This is a sugar function for `val = isRef(val) ? val.value : val.`

<https://vuejs.org/api/reactivity-utilities#unref>

<hr>

## 單元 4 - 首頁 - 左下熱門文章

## 單元 5 - 首頁 - 右下最新留言

<https://bruce-fe-fb.web.app/image/avator.png>

<hr>

在 vue 2 時期規定每個 .vue 檔案中的 template 一定要存在一個根元素(通常是div)

在 vue 3 解除此限制, template 中可以出現兄弟元素作為根(多根?),  但如此一來要從 Table.vue 元件標籤上設定傳值(且該值不通過 `defineProps` 傳遞), 如本專案的 class 並繼承給內部其他結構時就失去了樣式的繼承落點, 故我們在 Table.vue 內部中的根元素上追加一個 `v-bind="$attrs"` 如此一來外部通過元件標籤傳值到內部時, 數據都會落在 `v-bind="$attrs"`元素身上

`v-bind="$attrs"`

<hr>

**Add vertical space between children**  
Use the `space-y-*` utilities to control the vertical space between elements.

<https://tailwindcss.com/docs/space#add-vertical-space-between-children>



# 第 6 章 表單篇 134 mins - 新增文章
## 單元 1 - 基本表單排版
文章內容,
縮圖,
上傳圖片,
文章簡介,
標籤,

<hr>

**Dynamic Routes**  
Dynamic routes are denoted using square brackets. Both directories and pages can be dynamic:

<https://github.com/hannoeru/vite-plugin-pages?tab=readme-ov-file#dynamic-routes>

## 單元 2 - 文章標題 - 文字輸入框元件


**// src/components/TextInput.vue**  
defineEmits([])  
defineProps({})  
vueUse()  

<hr>

**子元的件屬性繼承與屬性落點控制**

This macro can be used to declare component options directly inside `<script setup>` without having to use a separate `<script>` block:

<https://vuejs.org/api/sfc-script-setup.html#defineoptions>


請幫我將下列內容修改成vue 3 的 compositions API寫法, 謝謝
export default {
inheritAttrs: false,
}

1. 先將繼承預設行為關閉 `inheritAttrs: false`
```jsx
defineOptions({
  inheritAttrs: false,
})
```

2. 在子元素中的指定結構處加上`v-bind="$attrs"`, 從父層繼承來的其他屬性會落在這個結構上
```html
<target-div v-bind="$attrs"></target-div>
```

<hr>

**// src/components/TextareaInput.vue**

## 單元 3 - 文章標題 - 上傳圖片

**// src/components/ImageUpload.vue**

在維持開發人員指定長寬比前提下, 擷取符合畫框寬高的圖片區域來渲染, 並裁切丟掉超出畫框範圍的區域

**Object Fit**
Utilities for controlling how a replaced element's content should be resized.

object-cover

<https://tailwindcss.com/docs/object-fit#class-reference>

<hr>

ref 可能使用場景: 當我們希望改用原生 js 語法而非 vue 語法來打開 input:file 的選擇檔案視窗時

<hr>

```html
 <input
      ref="fileEl"
      type="file"
      accept="image/*"
      class="hidden"
    />
    <!-- accept="image/*" : 限制上傳的檔案類型 -->
```

<hr>

點擊 A 元素, 瀏覽器聽見後
對著 B 元素(帶有記號 ref="fileEl" 的 input 元素) 執行點擊事件

```jsx
// 按下上傳圖片按鈕後
const selectFile = () => {
  // 打開上傳檔案視窗
  fileEl.value.click()
}
```

<hr>

**aspect-w-16**  
底層自帶設定 `position:relative;`

## 單元 4 - 文章標題 - 標籤輸入框

A tags input component for VueJS  
<https://github.com/sipec/vue-tags-input>



### /src/components/TagsInput.vue

<hr>

本單元多處使用 map 來改造資料結構中欄位&值的層次關係

```jsx
arr.map((data)=> return data)

arr.map((data)=> return {data})
```

<hr>

在 defineProps 中, 陣列與物件的預設值要這書寫

```jsx
const props = defineProps({
  // 陣列
  autocompleteItems: {
    type: Array,
    default:()=>[]
  },
  // 物件
  randomObj: {
    type: Object,
    default:()=>()
  },
})
```

<hr>

 函數單行回傳物件語法: key & value 同名時合併 + 省去 return + 省去 {} + 補()

 ```jsx
// 完整
const randomFun = text => {
  // key & value 合併
  return { text:text }
}

// 簡寫
const randomFun = text => ({text})
 ```

<hr>

### /src/styles/tags.css

<hr>

**focus-within(:focus-within)**  
Style an element when it or one of its descendants has focus using the focus-within modifier:

<https://tailwindcss.com/docs/hover-focus-and-other-states#focus-within>

<hr>

script 源始碼

devtool
DOM: 查看瀏覽器經過解析原始碼後如何使用html結構&class
VueDevTool: 查看各個 vue元件使用變數 & 路由的真實狀況

## 單元 5 - 表單送出載入中狀態

### src/components/Loading.vue

<hr>

### src/components/LoadingIcon.vue

**Circle Icon URL**
<https://fontawesome.com/icons/circle?f=classic&s=regular>


<hr>

**promiseTimeout 模擬具有等待特性的異步操作: 發送API...**

```jsx
import { promiseTimeout } from "@vueuse/core"

await promiseTimeout(1000)
```

## 單元 6 - 編輯表單頁面

### src/sections/PostForm.vue

問題紀錄：  
在完成 `src/pages/posts/[id].vue` 段落後,  
測試功能性時發現 `src/pages/posts/index.vue` 當中的編輯文章連結,  
經點該連結後發現路由有跳轉(瀏覽器URL地址有發生變化, 但轉向一個不存在的路徑), 使得畫面一片空白  
經檢查原始碼後發現`src/pages/posts/index.vue`中第123行的錯誤 & 修正後結果如下

```jsx
// 原來錯誤
:to="`${record.id}`"

// 修正之後
:to="`/posts/${record.id}`"
```


# 第 7 章 顯示資料篇 153 mins - 首頁 & 圖表
## 單元 1 - tiptap: 無樣式的所見所得編輯器

**Integrate the Tiptap Editor**  
<https://tiptap.dev/docs/editor/getting-started/install>


## 單元 2 - 文章內容 - 所見所得編輯器

AI prompt:
謝謝, 請幫我生成一段 html 內容, 需求如下
1. 行數約20行
2. 內容主要描述自我介紹，前端工程師約1年的常見履歷
3. 使用到常見的 semantic tag, 如 h2, p, img, ul, li ,blockquote

<hr>

施工資料夾  
### src/components/Editor/Editor.vue
### src/components/Editor/EditorMenu.vue
### src/components/Editor/EditorMenuitem.vue

<hr>

問題紀錄:  
發現瀏覽器告警: `Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'isActive')`  
解決方式如下: 在 `EditorMenuBar`,`editor-content` 外層補上一層 v-if 判斷當前 editor 存在時才渲染畫面
```html
<div v-if="editor">
  <!-- editor-menu-bar -->
  <!-- 工具列 -->
  <EditorMenuBar :editor="editor"></EditorMenuBar>
  <!-- editor-content  -->
  <editor-content :editor="editor" />
</div>
```

<hr>

`min-h-[300px]` 在沒有內容的時候元素也具有寬度

## 單元 3 - 編輯器 - 工具列定位

inset
<https://tailwindcss.com/docs/top-right-bottom-left#class-reference>

<hr>

sticky: 當滑鼠往下滾動時 (視窗往下運動, 相當元素往上運動), 該 div處在持續運動中且未到達 sticky定位點之前是 `relative`, 觸碰到定位點後改為 `fixed`, 最後直到父元素底部也觸碰到子元素sticky定位點後就會把該元素推出視窗外

**Sticky positioning elements**  
Use the sticky utility to position an element as relative until it crosses a specified threshold, then treat it as fixed until its parent is off screen.

<https://tailwindcss.com/docs/position#sticky-positioning-elements>


## 單元 4 - 編輯器 - 插入連結樣式

**Link extension**  
<https://tiptap.dev/docs/editor/extensions/marks/link>

<hr>

**REMIX ICON**  
<https://remixicon.com/>

## 單元 5 - 編輯器 - 插入連結功能

**EditorMenuLink.vue:48:15**  
Uncaught TypeError: Cannot read properties of null (reading 'focus') at handleAction

<hr>

**nextTick()**  
當出現一種場景:  
在你修改完向響應式變數`2.`後, 要緊接者取得相同(2.與1.都落在同個元素上)元素 DOM `1.`時(特別常發生在input上?)
需搭配使用 nextTick(), 並注意使用修改變數與取得 DOM 的先後順序  
順序應為: 修改變數 => nextTick(() => {取得DOM} )

感覺上這是異步操作
1. vue 底層監聽數據發生變化 => 重渲染畫面, 這段過程有一段時間差
2. 並且 vue 會週期性地等待一段時間長度, 並統計在這段時間發生的所有響應數據改變; 在本次時間長度尾端將所有使用響應數據的畫面上對應位置一次性更新, vue 更新完畫面後會開啟下一輪的計時與統計
3. ✨如果此時使用者因為與畫面互動而引起數據改變的時間點, 而該時間點點早於畫面更新時間點, 此刻如果立刻要求拿取畫面上的不存在DOM就會撲空(因為瀏覽器尚未渲染、沒有DOM、就沒有畫面)

```html
<button
  @click="handleAction"
>
</button>

<input
  ref="urlEl" // 這裡 1.
  v-model="url"  // 這裡 2.
/>
```
```jsx
// 點擊編輯導航中的超連結icon後的函數
const handleAction =  () => {

// 每次打開連結選單, 第一時間先把 url 容器內清空(發生修改變數)
url.value = ""

// 其他操作 ...

// 告訴 vue 在緊接下來一個畫面更新週期過後立刻取得取得指定的 DOM, 以利完成本函數 handleAction的全部流程
  nextTick(() => {
    urlEl.value.focus()
  })
}
```

<hr>

provide, inject

<hr>

如何使用vs code查看插件某特定函數或變數的對應源碼?  
圈選該變數或函數後, 右鍵點選`移至定義 (或快捷鍵 F12)`

<hr>

擷取插件原始碼並修改成專案用途: 太難了!!!


## 單元 6 - 編輯器 - 插入圖片
Image - Tiptap

Tabs - Headless UI

onClickOutside - VueUse

<hr>

**Tabs**  
Easily create accessible, fully customizable tab interfaces, with robust focus management and keyboard navigation support.

<https://headlessui.com/v1/vue/tabs>

<hr>

`button`取得焦點時預設會出現外框, 使用`focus:outline-none`隱藏這個外框

<hr>

### Uncaught TypeError: editor.value.chain(...).focus(...).setImage is not a function
    at Proxy.action (EditorMenuBar.vue:84:51)
    at handleSubmit (EditorMenuImage.vue:58:11)
action	@	EditorMenuBar.vue:84
handleSubmit	@	EditorMenuImage.vue:58

告警解讀: 瀏覽器不認識, 或找不到 setImage 方法

錯誤根源: 新增 editor 中的其他模組時, 漏掉註冊模組環節

解決: 安裝 startkit 中沒有提供的額外插件時, 記得回到實例化設定檔物件中的 extension 欄位註冊模組名稱 Image(本次使用的新模組)

### src/components/Editor.vue
👋import Image from '@tiptap/extension-image'

mounted() {
    this.editor = new Editor({
      extensions: [
        👋Image,
      ],
      content: `...`,
    })
  },

### src/styles/form.css



<hr>

**onClickOutside**  
Listen for clicks outside of an element. Useful for modal or dropdown.

<https://vueuse.org/core/onClickOutside/>


## 單元 7 - [更新] 解決設定 key 時 顯示錯誤提示


# 第8章 其他頁面 33 mins
## 單元 1 - 登入頁面
### src/pages/login.vue

## 單元 2 - 註冊頁面
### src/pages/register.vue

## 單元 3 - 個人資料頁面
### src/pages/setting.vue
### src/components/CardContent.vue

<hr>

`w-full`: 伸懶腰, 作用元素寬度等於其父元素可佔用寬度全部

`w-auto`: 作用元素寬度等於元素自身content寬度

<hr>

**Ordering flex and grid items**
Use the order-* utilities to render flex and grid items in a different order than they appear in the DOM.

<https://tailwindcss.com/docs/order#class-reference>


# 第9章 總結 35 mins

## 單元 1 - 優化 Tailwind CSS 的 12個小技巧

🔗
<https://lucas-hiskio-2021-tailwindcss-slide.vercel.app/tailwindcss-12-tips/1>

## 單元 2 - 部屬專案到 Vercel

**Vercel**  
<https://vercel.com/>

<hr>

**一些調整: 從 vercel 部署平台瀏覽專案, 調整找不到路徑等問題**

**vercel.json**  
<https://vercel.com/docs/projects/project-configuration#legacy-spa-fallback>

```json
"rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
```

## 單元 3 - 優化 Vite 依賴 & 預編譯

**Dependency Pre-Bundling**  
When you run vite for the first time, Vite prebundles your project dependencies before loading your site locally. It is done automatically and transparently by default.

<https://vite.dev/guide/dep-pre-bundling.html>

**Customizing the Behavior**  
The default dependency discovery heuristics may not always be desirable. In cases where you want to explicitly include/exclude dependencies from the list, use the optimizeDeps config options.

<https://vite.dev/guide/dep-pre-bundling.html#customizing-the-behavior>


**Caching**  
File System Cache  
<https://vite.dev/guide/dep-pre-bundling.html#caching>


**優化vite 依賴 & 編譯流程**
**optimizeDeps.include**
<https://vite.dev/config/dep-optimization-options.html#optimizedeps-include>

## 單元 4 - 課程總結

Ant Design of Vue  
<https://ant.design/>

ElementPLus  
<https://element-plus.org/zh-CN/>

Tailwind Components  
<https://www.creative-tim.com/twcomponents/>

awesome-tailwindcss  
<https://github.com/aniftyco/awesome-tailwindcss>

# 第10章 [彩蛋章節] 簡易部落格前台
<!--  -->
# 第11章 [彩蛋章節] 切換主題顏色
<!--  -->
# 本專案發現 & 回顧: 相當於深度了解職業的 live coding + 佈署 + 少量debug:  
## 本專案與其他課程比較:
數據來源: 本地 dummy data,
其他課堂: JSON SERVER, 串接API

<hr>

**vue API 使用種類與頻率**
`defineProps({})` 多
`defineEmits([])` 多
`defineOptions({})` 少
`defineExpose({})` 其他專案
`provide & inject` 少
`v-bind`
`v-model` 多
`keyup.enter` 少

`<template #mySlot>`
`<slot name="mySlot">`

`<template v-slot={ myKey }>`
`<slot name="mySlot">`

`v-model="myValue"`
`defineProps({modelValue:String})`
`defineEmits(['update:modelValue'])`


<hr>

vue plugin & 其他第三方插件使用種類
mitt()


其他課堂: vue router, pinia

<hr>

多次拆分vue元件&第三方插件再封裝

<hr>

# 師生QA

## scss 與 tailwindcss 共用問題
Q: 老師好，我現在有一個疑惑是
要是我將scss 和 tailwindcss 一同載入，那variables那種顏色變數 會如何處理
是要各自設定嗎？還是實務上其實不會這兩套同時用~~

A: 嗯... 這裡的兩個問題雖然有點不一樣...

還是先上結論好了：

1. Tailwind CSS 官方強烈不建議同時和 SASS 一起使用。

2. 如果一同載入的話，變數只能各自設定，無法互通。

Tailwind 本質是 PostCSS 的套件，依賴於 PostCSS 這個工具來執行。因此這時候就要回來了解 SASS 和 PostCSS 這兩個工具的差異了。

兩者都是處理 CSS 的工具，但差在於：

* SASS 是 Preprocessor (預處理器)，將 .sass/.scss 的特定語法轉換成瀏覽器能讀的 .css

* PostCSS 是 Postprocessor (後處理器)，將 .css 中的特殊寫法的 CSS 轉換成瀏覽器能讀的 .css

因此執行順序上一定會先執行 SASS 然後才 PostCSS。

技術上兩者是可以同時使用，但還是有一些衝突的地方，比如 important 不能

`@apply bg-red-500 !important;`

要加上 #{...}

`@apply bg-red-500 #{!important};`

兩者都有一套自己完整的建構系統，如果要有比較好的開發體驗，建議會選擇其中一套來使用就好，畢竟兩者常用的開發方式真的天差地別。