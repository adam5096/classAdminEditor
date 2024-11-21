<script setup>
// setup 所處在的生命週期, 瀏覽器尚未準備好DOM
// 若要加入使用 chart.js , 需要在 vue 的 onMounted 週期內拿到 DOM 後才能進行配合取得 chart 所需的 DOM 與資料

import { ref, onMounted } from "vue"

import { useLineChart, useBarChart } from "@/composables/useChart"

// canvas: line DOM
const lineChartEl = ref(null)
// canvas: bar DOM
const barChartEl = ref(null)

onMounted(() => {
  // lineChartEl
  useLineChart(
    lineChartEl,
    [
      "11/11(一)",
      "11/12(二)",
      "11/13(三)",
      "11/14(四)",
      "11/15(五)",
      "11/16(六)",
      "11/17(日)",
    ],
    [
      {
        // 資料說明標籤
        label: "11/11 - 11/17",
        // data 陣列成員數量與上方 labels 陣列成員數量一致
        data: [0, 10, 5, 2, 20, 30, 45],
        // violet-600
        color: "#7c3aed",
      },
      {
        label: "11/4 - 11/10",
        // data 陣列成員數量與上方 labels 陣列成員數量一致
        data: [6, 25, 22, 37, 14, 8, 4],
        // violet-300
        color: "#c4b5fd",
      },
    ],
  )
  // barChartEl

  useBarChart(
    barChartEl,
    ["(一)", "(二)", "(三)", "(四)", "(五)", "(六)", "(日)"],
    [
      {
        label: "電腦",
        // data 陣列成員數量與上方 labels 陣列成員數量一致
        data: [0, 10, 5, 2, 20, 30, 45],
        // violet-600
        color: "#7c3aed",
      },
      {
        label: "手機",
        // data 陣列成員數量與上方 labels 陣列成員數量一致
        data: [6, 25, 22, 37, 14, 8, 4],
        // violet-300
        color: "#f0abfc",
      },
    ],
  )
})

// 首頁 > 熱門文章相關數據

const postsColumns = ref([
  { key: "title", label: "標題" },
  { key: "visits", label: "瀏覽次數" },
  { key: "created_on", label: "建立日期" },
])

// 熱門文章: 表格資料
// 模擬: 串接 API 後取回資料
const postsData = ref([
  {
    id: 1,
    title: "我的文章 01",
    visits: 38,
    visits_trending_is_up: false,
    visits_trending_value: 4,
    created_on: "2024/11/07",
  },
  {
    id: 2,
    title: "我的文章 02",
    visits: 69,
    visits_trending_is_up: false,
    visits_trending_value: 9,
    created_on: "2024/11/07",
  },
  {
    id: 3,
    title: "我的文章 03",
    visits: 333,
    visits_trending_is_up: true,
    visits_trending_value: 30,
    created_on: "2024/11/07",
  },
  {
    id: 4,
    title: "我的文章 04",
    visits: 4,
    visits_trending_is_up: true,
    visits_trending_value: 3,
    created_on: "2024/11/08",
  },
  {
    id: 5,
    title: "我的文章 05",
    visits: 15,
    visits_trending_is_up: false,
    visits_trending_value: 8,
    created_on: "2024/11/09",
  },
  {
    id: 6,
    title: "我的文章 06",
    visits: 45,
    visits_trending_is_up: true,
    visits_trending_value: 18,
    created_on: "2024/11/10",
  },
  {
    id: 7,
    title: "我的文章 07",
    visits: 73,
    visits_trending_is_up: true,
    visits_trending_value: 7,
    created_on: "2024/11/11",
  },
])

// 模擬 : 串接 API 後取回資料
// 最新留言: 留言相關數據
const comments = ref([
  {
    author_name: "Adam 亞當",
    author_avatar: "https://bruce-fe-fb.web.app/image/avator.png",
    content: "挖!這好棒!!!",
    post_id: 1,
    post_title: "我的文章01",
  },
  {
    author_name: "John 強",
    author_avatar: "https://bruce-fe-fb.web.app/image/avator.png",
    content: "挖!這好酷!!!",
    post_id: 2,
    post_title: "我的文章02",
  },
  {
    author_name: "Leon 力昂",
    author_avatar: "https://bruce-fe-fb.web.app/image/avator.png",
    content: "挖!這好有趣!!!",
    post_id: 3,
    post_title: "我的文章03",
  },
  {
    author_name: "Eric 艾瑞克",
    author_avatar: "https://bruce-fe-fb.web.app/image/avator.png",
    content: "挖!這好想要!!!",
    post_id: 4,
    post_title: "我的文章04",
  },
])
</script>

<template>
  <Layout>
    <PageHeader>
      <template #title>首頁</template>
    </PageHeader>

    <div class="mt-6 grid md:grid-cols-12 gap-4">
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="eye"
        label="瀏覽人次"
        value="777"
        :isUp="true"
        trending="99"
        stretch
      >
      </TrendingCard>
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="star"
        label="按讚數"
        value="999"
        :isUp="false"
        trending="2"
        stretch
      >
      </TrendingCard>
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="annotation"
        label="留言數"
        value="333"
        :isUp="true"
        trending="77"
        stretch
      >
      </TrendingCard>

      <!-- 瀏覽人次 -->
      <Card
        class="md:col-span-8 min-w-0"
        stretch
      >
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">
            瀏覽人次
          </h2>
          <!-- min-h-0: 避免當元素缺少固定高度時, 其內容會溢出元素邊界 -->
          <div class="flex-grow pt-4 min-h-0">
            <canvas ref="lineChartEl"></canvas>
          </div>
        </div>
      </Card>

      <!-- 瀏覽裝置 -->
      <Card
        class="md:col-span-4 min-w-0"
        stretch
      >
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">
            瀏覽裝置
          </h2>
          <!-- min-h-0: 避免當元素缺少固定高度時, 其內容會溢出元素邊界 -->
          <div class="flex-grow pt-4 min-h-0">
            <canvas ref="barChartEl"></canvas>
          </div>
        </div>
      </Card>

      <!-- 熱門文章 -->
      <Card
        class="md:col-span-8 min-w-0 h-full"
        stretch
      >
        <div class="flex justify-between p-5 pb-0">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">
            熱門文章
          </h2>
          <router-link
            to="/posts"
            class="link flex items-center font-normal"
          >
            全部文章
            <HeroiconsOutlineChevronDoubleRight
              class="ml-1"
            ></HeroiconsOutlineChevronDoubleRight>
          </router-link>
        </div>

        <Table
          class="mt-4"
          :columns="postsColumns"
          :data="postsData"
          :show-selection="false"
          :show-actions="false"
          :show-paginator="false"
        >
          <template #column-title="{ record, value }">
            <RouterLink
              :to="`${record.id}`"
              class="link font-normal"
              >{{ value }}</RouterLink
            >
          </template>

          <template #column-visits="{ record, value }">
            <div class="inline-flex items-center font-normal">
              <HeroiconsOutlineEye class="inline-block w-4 h-4 mr-1" />
              {{ value }} 次
              <Trending
                class="ml-2"
                :is-up="record.visits_trending_is_up"
                :value="record.visits_trending_value"
                :percentage="true"
              ></Trending>
            </div>
          </template>
        </Table>
      </Card>

      <!-- 最新留言 -->
      <Card
        class="md:col-span-4 min-w-0 h-full"
        stretch
      >
        <div class="p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">
            最新留言
          </h2>
          <ul class="mt-4 space-y-4">
            <li
              class="flex"
              v-for="comment in comments"
              :key="comment.post_id"
            >
              <!-- avatar -->
              <img
                class="w-8 h-8 rounded-full"
                :src="comment.author_avatar"
                alt="avatar"
              />
              <div class="mt-1 ml-4 flex-grow">
                <div class="text-gray-800 font-medium tracking-wide">
                  {{ comment.author_name }}
                </div>
                <div class="mt-2 text-gray-500 text-sm">
                  {{ comment.content }}
                </div>
                <div
                  class="mt-2 px-3 py-1.5 bg-gray-100 text-sm rounded text-gray-500"
                >
                  留言文章:
                  <router-link
                    class="link"
                    :to="`/post/${comment.post_id}`"
                    >{{ comment.post_title }}</router-link
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  </Layout>
</template>
