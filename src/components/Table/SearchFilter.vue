<script setup>
import { ref, reactive, toRefs } from "vue"
// 註冊下列的功能的對應事件: 篩選、搜尋、清除
const emit = defineEmits(["filter", "search", "reset"])

// 多選框提供的選項管理: 未來可從發送API後取回資料
const tagsOptions = ref([
  "標籤1",
  "標籤2",
  "Vue3 composition API",
  "Tailwind CSS",
])

// 表單: 蒐集使用者數據
const form = reactive({
  created_date_compare: null, // 指定日期與當前日期差距
  created_date_value: null, // 當前資料建立日期
  visits_compare: null, // 瀏覽次數差距
  visits_count: null, // 累計瀏覽次數
  tags: [], // 標籤勾選狀態
  soft_delete: `default`,
})

// 搜尋框: 蒐集使用者數據
const search = ref("")

// 通知父層元件監聽事件 filter 與接收傳值
// 淺拷貝另一份副本物件 {...form} 給父元件, 避免影響來於物件的屬性與值(從操作角度隔離)
const submit = (close) => {
  emit("filter", { ...form })
  // PopoverPanel有預先提供關閉選單函數 close, 我們從其身上透過作用域插槽  v-slot="{ close }" 取出 close
  close()
}

// 通知父層元件監聽事件 search 與接收傳值
const submitSearch = () => {
  emit("search", search.value)
}

// 通知父層元件監聽事件 search 與接收傳值
const reset = () => {
  form.created_date_compare = null
  form.created_date_value = null
  form.visits_compare = null
  form.visits_count = null
  form.tags = []
  form.soft_delete = `default`
  search.value = ""
}
</script>

<template>
  <div class="flex items-center">
    <div class="flex flex-grow shadow rounded-md md:flex-grow-0">
      <!-- 篩選 -->
      <Popover class="relative flex-shrink-0 -mr-px focus:z-[1]">
        <PopoverButton class="form-select pl-4 text-gray-600 rounded-r-none"
          >篩選</PopoverButton
        >

        <TransitionZoom>
          <!-- 篩選展開選單 -->
          <PopoverPanel
            class="absolute z-10 origin-top-left"
            v-slot="{ close }"
          >
            <div
              class="mt-2 p-4 w-[270px] bg-white border border-gray-200 rounded-md shadow-lg space-y-4"
            >
              <!-- 建立日期 -->
              <div>
                <label class="text-gray-400 text-sm">建立日期</label>
                <div class="mt-1 flex">
                  <select
                    v-model="form.created_date_compare"
                    class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]"
                  >
                    <option value="before">之前</option>
                    <option value="after">之後</option>
                  </select>
                  <input
                    v-model="form.created_date_value"
                    type="date"
                    class="form-input rounded-l-none"
                  />
                </div>
              </div>
              <!-- 瀏覽次數 -->
              <div>
                <label class="text-gray-400 text-sm">瀏覽次數</label>
                <div class="mt-1 flex">
                  <select
                    v-model="form.visits_compare"
                    class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]"
                  >
                    <option value="greater">大於</option>
                    <option value="less">小於</option>
                  </select>
                  <input
                    v-model="form.visits_count"
                    type="number"
                    class="form-input rounded-l-none"
                  />
                </div>
              </div>
              <!-- 標籤 -->
              <div>
                <label class="text-gray-400 text-sm">標籤</label>
                <div class="mt-1">
                  <label
                    v-for="tag in tagsOptions"
                    :key="tag"
                    class="flex items-center"
                  >
                    <input
                      type="checkbox"
                      class="form-checkbox mr-1"
                      v-model="form.tags"
                      :value="tag"
                    />
                    <span>{{ tag }}</span>
                  </label>
                </div>
              </div>
              <!-- 軟刪除 -->
              <div>
                <label class="text-gray-400 text-sm">軟刪除</label>
                <div class="mt-1">
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio mr-1"
                      v-model="form.soft_delete"
                      value="default"
                    />
                    <span>預設</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio mr-1"
                      v-model="form.soft_delete"
                      value="contains"
                    />
                    <span>包含軟刪除</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      type="radio"
                      class="form-radio mr-1"
                      v-model="form.soft_delete"
                      value="only"
                    />
                    <span>只有軟刪除</span>
                  </label>
                </div>
              </div>

              <!-- 確認，取消 -->
              <div class="flex justify-end space-x-2">
                <SecondaryButton
                  class="btn-sm"
                  @click="close"
                >
                  取消
                </SecondaryButton>
                <PrimaryButton
                  class="btn-sm"
                  @click="submit(close)"
                >
                  確定
                </PrimaryButton>
              </div>
            </div>
          </PopoverPanel>
        </TransitionZoom>
      </Popover>

      <!-- 搜尋 -->
      <input
        type="text"
        placeholder="搜尋..."
        v-model="search"
        class="form-input form-input-sm placeholder-gray-400 focus:z-[1] rounded-l-none md:max-w-[200px]"
        @keyup.enter="submitSearch"
      />
    </div>

    <!-- 清除 -->
    <button
      type="button"
      class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500 transition-colors duration-100"
      @click="reset"
    >
      清除
    </button>
  </div>
</template>

<style scoped></style>
