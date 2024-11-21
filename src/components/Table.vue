<script setup>
import { useConfirm } from "@/composables/useConfirmModal"
import { ref, computed, watch, nextTick } from "vue"

const emit = defineEmits(["delete-selected"])

// 接收資料來自父元件 post.vue
const props = defineProps({
  // 表格標題數據
  columns: {
    type: Array,
    required: true,
  },
  // 表格主體數據
  data: {
    type: Array,
    required: true,
  },
  // 缺少主體數據時的判斷
  emptyText: {
    type: String,
    default: "當前沒有任何資料",
  },
  // 按下刪除鍵後的提示訊息框標題
  confirmDeleteText: {
    type: String,
    default: "確定刪除嗎?",
  },
  // 控制 Table.vue 在 index.vue 中的顯示與隱藏
  showSelection: {
    type: Boolean,
    default: true,
  },
  // 控制 Table.vue 在 index.vue 中的編輯、刪除按鈕操作
  showActions: {
    type: Boolean,
    default: true,
  },
  // 控制 Table.vue 在 index.vue 中的分頁器相關數據
  showPaginator: {
    type: Boolean,
    default: true,
  },
})

// 操作盤的顯示與隱藏
const showActionsBar = ref(false)

// table 欄位數量
// props.columns.length 代表經 API 取回資料的既有欄位數量
// +2 代表: 核取方塊佔用另 1 欄位, 最右端操作按鈕佔用另 1 欄位
const columnsCount = computed(() => {
  return (
    props.columns.length +
    Number(props.showSelection) +
    Number(props.showActions)
  )
})

// 全部行的選取狀態的集合容器, 並給初始值
const selectAllState = ref("none")

// 各別核取方塊相關數據 => 保存各單獨橫行的選取狀態, 並給初始值
const rowSelectStatus = ref(props.data.map((_) => false))

// 保存存那些被選到的單選框的狀態
const selectedIds = computed(() => {
  return props.data
    .filter((_, index) => rowSelectStatus.value[index])
    .map((record) => record.id)
})

// 全選 & 反選 關聯邏輯
// 為解決語法糖 v-model 在 SelectAllCheckbox, SelectRowCheckbox 會影響彼此狀態值這個副作用, 另新增函數來分割兩者操作使其獨立
const updateSelectAllState = (state) => {
  // 當全選框勾選時修改其狀態
  selectAllState.value = state

  // 當全選框勾選時, 將各獨立選框狀態全部寫上勾選
  rowSelectStatus.value = rowSelectStatus.value.map(
    () => selectAllState.value === "all",
  )
}
// 為解決語法糖 v-model 在 SelectAllCheckbox, SelectRowCheckbox 會影響彼此狀態值這個副作用, 另新增函數來分割兩者操作使其獨立
const updateRowSelectStatus = (state, index) => {
  rowSelectStatus.value[index] = state

  // all: selectedIds.value 所保存的狀態成員陣列長度 === 原始數據陣列總長度時 => 全部項目都打勾了
  if (selectedIds.value.length === props.data.length) {
    selectAllState.value = "all"
  }
  // some: selectedIds.value 所保存的狀態陣列長度, 其長度比0大同時短於原始數據陣列總長度時 => 勾選部分項目
  else if (
    0 < selectedIds.value.length &&
    selectedIds.value.length < props.data.length
  ) {
    selectAllState.value = "some"
  }
  // none: selectedIds.value 所保存的狀態陣列長度 等於0 => 沒有勾選核項目
  else {
    selectAllState.value = "none"
  }
}
// 全選 & 反選 關聯邏輯 End

// 操作盤上的刪除按鈕操作
const deleteRows = async () => {
  if (await useConfirm(props.confirmDeleteText)) {
    emit("delete-selected", selectedIds.value)

    // 以應對可能出現一些 DOM 操作
    await nextTick()

    // 將 props.data 陣列每個成員都賦值成 false 後, 將成果打包成一新陣列交給 rowSelectStatus.value
    rowSelectStatus.value = props.data.map((_) => false)

    // 將每個單選框的狀態清除成 none 狀態
    selectAllState.value = "none"

    // 關閉操作盤
  }
}

// paginator 相關數據
const currentPage = ref(1)
const totalPage = ref(10)

// 當勾選全選框、部分選框後, 展示操作盤
// include 會比對來源與特徵吻合與否後回傳 true, false 值
watch(selectAllState, (selectAllState) => {
  showActionsBar.value = ["all", "some"].includes(selectAllState)
})

// 當 data 缺少資料時, 全選框停用勾選
const selectAllDisabled = computed(() => {
  return props.data.length === 0
})
</script>

<template>
  <!-- 表格 -->
  <div
    class="overflow-x-auto"
    v-bind="$attrs"
  >
    <table class="w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th
            v-if="showSelection"
            class="pl-5 py-3 text-left"
          >
            <SelectAllCheckbox
              :state="selectAllState"
              @update:state="updateSelectAllState"
              :disabled="selectAllDisabled"
            ></SelectAllCheckbox>
          </th>
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="px-5 py-3 text-left text-sm font-medium tracking-wider whitespace-nowrap text-gray-400"
          >
            {{ column.label }}
          </th>

          <th v-if="showActions"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, index) in data"
          :key="record.id"
          :class="{ 'bg-violet-200': rowSelectStatus[index] }"
        >
          <td
            v-if="showSelection"
            class="pl-5 py-3"
          >
            <SelectRowCheckbox
              :state="rowSelectStatus[index]"
              :index="index"
              @update:state="updateRowSelectStatus"
            >
            </SelectRowCheckbox>
          </td>

          <td
            v-for="column in props.columns"
            :key="column.key"
            class="px-5 py-3 text-gray-600 whitespace-nowrap"
          >
            <!-- 作用域插槽, 再把資料傳回給 post.vue -->
            <slot
              :name="`column-${column.key}`"
              :column="column"
              :record="record"
              :value="record[column.key]"
            >
              {{ record[column.key] }}
            </slot>
          </td>

          <td
            v-if="showActions"
            class="px-5 py-3 flex text-gray-600 whitespace-nowrap"
          >
            <slot
              name="actions"
              :record="record"
              :confirmDeleteText="confirmDeleteText"
            ></slot>
          </td>
        </tr>

        <!-- edge case: 如果出於任何原因, 從API取得資料失敗, 給使用者所觀看的內容 -->
        <tr v-if="!props.data.length">
          <td
            :colspan="columnsCount"
            class="py-12 text-center text-gray-400"
          >
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 分頁器 -->
  <Paginator
    v-if="showPaginator"
    v-model:current-page="currentPage"
    :total-page="totalPage"
    class="border-t border-gray-200"
  >
  </Paginator>

  <!-- 選擇項目後操作盤 -->
  <ActionsBar :show="showActionsBar">
    <div class="text-gray-600 text-sm sm:text-base">
      已選取 {{ selectedIds.length }} 筆資料
    </div>

    <div class="space-x-2">
      <PrimaryButton
        class="btn-sm sm:btn-base"
        @click="updateSelectAllState('all')"
        >全選</PrimaryButton
      >
      <DangerButton
        class="btn-sm sm:btn-base"
        @click="deleteRows"
        >刪除</DangerButton
      >
      <SecondaryButton
        class="btn-sm sm:btn-base"
        @click="updateSelectAllState('none')"
        >取消</SecondaryButton
      >
    </div>
  </ActionsBar>
</template>
