<script setup>
import { successNotify } from "@/composables/useNotification"
import { ref } from "vue"

// 卡片標題
// 模擬: 串接 API 後取回資料
// Table 元件中 v-for 指令中的 :key 值來源, 取自這裡的key
const columns = ref([
  { key: "title", label: "標題" },
  { key: "desc", label: "簡介" },
  { key: "visits", label: "瀏覽次數" },
  { key: "created_on", label: "建立日期" },
  { key: "tags", label: "標籤" },
])

// 表格資料
// 模擬: 串接 API 後取回資料
const data = ref([
  {
    id: 1,
    title: "我的文章 01",
    desc: "文章簡介...",
    visits: 123,
    created_on: "2024/11/07",
    tags: ["NodeJS", "Express"],
  },
  {
    id: 2,
    title: "我的文章 02",
    desc: "文章簡介...",
    visits: 123,
    created_on: "2024/11/07",
    tags: ["Javascript", "CSS"],
  },
  {
    id: 3,
    title: "我的文章 03",
    desc: "文章簡介...",
    visits: 123,
    created_on: "2024/11/07",
    tags: ["Tailwind CSS", "Vue", "HTML"],
  },
  {
    id: 4,
    title: "我的文章 04",
    desc: "文章簡介...",
    visits: 45,
    created_on: "2024/11/018",
    tags: ["useVModel", "useTimeout"],
  },
])

// 排序功能要保存的數據
const sort = ref("asc")

// table 中每個單一 row 最右側的刪除按鈕
const handleDeletePost = (deleteRecord) => {
  // console.log("刪除單一文章, 送發API => HTTP request delete", record)

  // 刪除: 留下那些 record.id !== ids 的 record => 只拔掉被使用者勾選的 tr
  // 注意這裡的 deleteRecord 變數相當是 data 陣列內的每個物件成員 Object
  // post.vue 將 data 往 table.vue 內傳後用 record 接住 , table.vue 再用作用域插槽將 record 往外傳出來給 DeleteAction 接住並送往內部
  // DeleteAction 向祖先層 post.vue 激發 handleDeletePost 事件並傳出 record 交給 post.vue使用進行刪除邏輯
  data.value = data.value.filter((record) => record.id !== deleteRecord.id)
  successNotify("文章刪除成功")
}

// 操作盤中的刪除文章按鈕
// 注意這裡的 ids 是個陣列, 成員類型都是 number, 由子組件 Table.vue 激發事件後通知父層傳值而來
const handleDeleteSelectedPost = (ids) => {
  // 刪除: 留下那些 record.id !== ids 的 record => 只拔掉被使用者勾選 tr
  data.value = data.value.filter((record) => !ids.includes(record.id))
  successNotify("文章刪除成功")
}

// 監聽子元件 searchFilter 內部事件 filter 後
const handleFilter = (data) => {
  console.log("來自searchFilter的資料 form => ", data)
}
// 監聽子元件 searchFilter 內部事件 search 後
const handleSearch = (query) => {
  console.log("來自searchFilter的資料 form => ", query)
}
</script>

<template>
  <Layout>
    <!-- PageHeader -->
    <PageHeader>
      <template #title>文章</template>
      <template #actions>
        <PrimaryButton to="/posts/create">新增</PrimaryButton>
      </template>
    </PageHeader>

    <!-- 其他功能區: 篩選, 搜尋, 清除, 排序 -->

    <div class="mt-6 md:flex md:justify-between md:items-center">
      <SearchFilter
        @filter="handleFilter"
        @search="handleSearch"
      ></SearchFilter>

      <SortSelect
        v-model="sort"
        class="mt-4 md:mt-0 md:ml-2"
      ></SortSelect>
    </div>

    <!-- 資料顯示區 -->
    <Card
      class="mt-6"
      stretch
    >
      <Table
        :columns="columns"
        :data="data"
        confirm-delete-text="確定要刪除文章嗎"
        @delete-selected="handleDeleteSelectedPost"
      >
        <template #column-title="{ record, value }">
          <RouterLink
            :to="`/posts/${record.id}`"
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
        <template #actions="{ record, confirmDeleteText }">
          <!-- 編輯按鈕 -->
          <EditAction :to="`/posts/${record.id}`" />
          <!-- 刪除按鈕 -->
          <DeleteAction
            :record="record"
            :confirm-text="confirmDeleteText"
            @delete="handleDeletePost"
          />
        </template>
      </Table>
    </Card>
  </Layout>
</template>
