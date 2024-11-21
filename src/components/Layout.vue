<script setup>
import HeroiconsOutlineHome from "~icons/heroicons-outline/home"
import HeroiconsOutlineDocumentText from "~icons/heroicons-outline/document-text"
import HeroiconsOutlineUser from "~icons/heroicons-outline/user"

import { ref, computed } from "vue"

import { useRoute, useRouter } from "vue-router"

// 實例化路由器
const route = useRoute()
const router = useRouter()

// 在小尺寸螢幕下點擊漢堡按鈕的變數 & 行為
const isShowMenu = ref(false)

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value
}
// 在小尺寸螢幕下點擊漢堡按鈕的變數 & 行為 - End

// 迴圈渲染導航區的結構 & 資料
// 此區資料&結構不會因為使用者的操作而產生變化, 故省去使用響應式函數ref, reactive
const menuItems = [
  { to: "/", text: "首頁", icon: HeroiconsOutlineHome },
  { to: "/posts", text: "文章", icon: HeroiconsOutlineDocumentText },
  { to: "/setting", text: "個人中心", icon: HeroiconsOutlineUser },
]
// 迴圈渲染導航區的結構 & 資料 - End

// 使用者名稱選單展示的資料來源
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
// 使用者名稱選單展示的資料來源 - End

// 根據當前路徑不同達成以下兩件事
// 1. 去增減樣式到導航結構的類名當中
// 2. 切換不同路由, 渲染不同畫面
// const path = "/setting/"

// 以 menuItems 成員作材料, 運用 computed 拼湊出一新衍生資料
const activeItem = computed(() =>
  // 下一列寫法 menuItems.reverse() 會覆蓋掉原始陣列的成員排序, 故我們使用陣列展開語法 [...menuItems].reverse() , 將新陣列與來原陣列分隔開後再行後續操作
  // menuItems.reverse().find(item=>path.startsWith(item.to)))

  // 先執行反轉陣列, 後執行比對查找成員
  [...menuItems].reverse().find((item) => route.path.startsWith(item.to)),
)

// 將當前頁面對應的路徑地址 與 衍生資料做比對查找
// 有找到 => isActive 拿到 true
// 沒找到 => isActive 拿到 false
const isActive = (to) => {
  return to === activeItem.value.to
}
// 根據當前路徑不同達成以下兩件事 - End
</script>

<template>
  <div class="flex flex-col sm:flex-row min-h-screen">
    <!-- 左側選單欄 -->
    <div
      class="relative z-20 flex flex-col justify-between flex-shrink-0 w-full bg-violet-600 text-white sm:w-64 sm:fixed sm:inset-y-0"
    >
      <!-- Logo -->
      <div
        class="flex justify-between items-center h-16 px-4 sm:justify-center"
      >
        <div class="flex justify-center items-center">
          <HeroiconsOutlineBookOpen class="w-10 h-10" />
          <span class="text-xl font-medium">Adam Press</span>
        </div>
        <!-- 漢堡 -->
        <button
          class="w-8 h-8 flex justify-center items-center sm:hidden"
          @click="toggleMenu"
        >
          <HeroiconsOutlineMenu class="w-5 h-5" />
        </button>
      </div>
      <!-- Logo End -->

      <div
        class="flex-grow sm:flex sm:flex-col sm:justify-between"
        :class="isShowMenu ? '' : 'hidden'"
      >
        <!-- 主要選單導航  -->
        <ul>
          <!-- v-for 渲染導航結構 -->
          <li
            v-for="item in menuItems"
            :key="item.to"
          >
            <RouterLink
              :to="item.to"
              class="flex items-center px-4 py-3 sm:px-5"
              :class="
                isActive(item.to)
                  ? 'text-white'
                  : 'text-violet-400 hover:text-white'
              "
            >
              <!-- iconComp -->
              <component
                :is="item.icon"
                class="w-5 h-5 mr-2"
              ></component>
              {{ item.text }}
            </RouterLink>
          </li>
        </ul>
        <!-- 主要選單導航 End -->

        <!-- 使用者名稱 - 手機 UI -->
        <div class="mt-2 py-1 border-t border-violet-400 sm:hidden">
          <div class="flex items-center px-4 py-3">
            <img
              class="w-8 h-8 rounded-full mr-2"
              src="https://bruce-fe-fb.web.app/image/avator.png"
              alt="avatar"
            />
            <div class="font-medium tracking-wide">I am Adam</div>
          </div>
          <ul>
            <template
              v-for="(item, i) in userMenuItems"
              :key="item.text"
            >
              <li v-if="item.mobile">
                <component
                  :is="item.tag"
                  class="flex items-center w-full px-4 py-3 text-violet-400 hover:text-white"
                  @click="item.onClick"
                >
                  {{ item.text }}
                </component>
              </li>
            </template>
          </ul>
        </div>

        <!-- 使用者名稱 - 手機 UI - End -->

        <!-- 使用者名稱 - 電腦 UI -->
        <div
          class="hidden sm:flex sm:justify-between items-center px-5 py-4 border-t border-violet-400"
        >
          <div class="flex items-center">
            <img
              class="w-8 h-8 rounded-full mr-2"
              src="https://bruce-fe-fb.web.app/image/avator.png"
              alt="avatar"
            />
            <div class="font-medium tracking-wide">I am Adam</div>
          </div>

          <Menu
            as="div"
            class="relative"
          >
            <MenuButton
              class="flex justify-center items-center w-7 h-7 hover:bg-violet-400 rounded-full transition-colors duration-100"
              type="button"
            >
              <HeroiconsOutlineDotsVertical class="w-5 h-5" />
            </MenuButton>

            <TransitionZoom
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute left-full bottom-0 ml-2 flex flex-col w-32 bg-white rounded-md shadow-lg overflow-hidden origin-bottom-left"
              >
                <MenuItem
                  v-slot="{ active }"
                  v-for="(item, i) in userMenuItems"
                  :key="item.text"
                >
                  <component
                    :is="item.tag"
                    :to="item.to"
                    class="px-3 py-2 text-gray-700 text-left text-base font-normal"
                    :class="active ? 'bg-gray-100' : ''"
                    @click="item.onClick"
                  >
                    {{ item.text }}
                  </component>
                </MenuItem>
              </MenuItems>
            </TransitionZoom>
          </Menu>
        </div>
        <!-- 使用者名稱 - 電腦 UI - End -->
      </div>
    </div>

    <!-- 右側內容區 -->
    <div class="relative z-10 flex-grow min-w-0 bg-gray-50 sm:pl-64">
      <div class="p-6 sm:px-10 sm:py-8">
        <slot></slot>
      </div>
    </div>
    <!-- 右側內容區 - End -->
  </div>
</template>
