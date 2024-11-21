// 此模組提供再封裝後的 chart 使用
// 並對 chart 簡化設定檔物件結構
// 開發人員從外部控制傳入當前 chart 所需的部分資料類型與數量

import { unref } from "vue"
import { Chart } from "chart.js"

// 由開發人員從外部傳入的變數: canvas, labels, datasets, options
export function useLineChart(target, labels, datasets, options) {
  const el = unref(target)

  return new Chart(el, {
    type: "line",
    data: {
      // 軸線說明標籤
      labels,
      datasets: datasets.map((dataset) => {
        return {
          // 資料說明標籤
          label: dataset.label,
          // data 陣列成員數量與上方 labels 陣列成員數量一致
          data: dataset.data, //[0, 10, 5, 2, 20, 30, 45]
          // violet-600
          borderColor: dataset.color, //"#7c3aed"
          backgroundColor: dataset.color,
          // 圖表線段圓弧程度, 範圍 0 ~ 1
          tension: 0.4,
        }
      }),
    },
    // Object.assign 將 chart 預設設定物件與外來傳入的設定物件合併
    options: Object.assign(
      {
        responsive: true,
        // false: 圖表預設長寬比解開固定, 讓圖表寬、高跟隨父元素寬高改變
        maintainAspectRatio: false,
        // 使用者與圖表互動相關設定
        interaction: {
          mode: "index",
          // 游標移動到資料曲線附近空白處就會顯示標籤說明)
          intersect: false,
        },
        plugins: {
          // 資料標籤設定
          legend: {
            // 對齊
            align: "end",
            // 定位
            position: "bottom",
          },
          // 圖表標題
          // title: {
          //   display: true,
          //   text: "Chart.js Line Chart",
          // },
        },
        scales: {
          x: {
            grid: {
              // 關閉上下方向背景格線(留下橫線)
              display: false,
            },
          },
          y: {
            border: {
              // 關閉垂直方向邊界格線(最靠邊的上下方向格線)
              display: false,
              // 背景橫線從實線樣式改虛線樣式
              dash: [3],
            },
          },
        },
      },
      options,
    ),
  })
}

//
export function useBarChart(target, labels, datasets, options) {
  const el = unref(target)

  return new Chart(el, {
    type: "bar",
    data: {
      // 軸線說明標籤
      labels,
      datasets: datasets.map((dataset) => {
        return {
          // 資料說明標籤
          label: dataset.label,
          // data 陣列成員數量與上方 labels 陣列成員數量一致
          data: dataset.data, //[0, 10, 5, 2, 20, 30, 45]
          // violet-600
          borderColor: dataset.color, //"#7c3aed"
          backgroundColor: dataset.color,
          barThickness: 8,
        }
      }),
    },
    // Object.assign 將 chart 預設設定物件與外來傳入的設定物件合併
    options: Object.assign(
      {
        responsive: true,
        // false: 圖表預設長寬比解開固定, 讓圖表寬、高跟隨父元素寬高改變
        maintainAspectRatio: false,
        // 使用者與圖表互動相關設定
        interaction: {
          mode: "index",
          // 游標移動到資料曲線附近空白處就會顯示標籤說明)
          intersect: false,
        },
        plugins: {
          // 資料標籤設定
          legend: {
            // 對齊
            align: "end",
            // 定位
            position: "bottom",
          },
          // 圖表標題
          // title: {
          //   display: true,
          //   text: "Chart.js Line Chart",
          // },
        },
        scales: {
          x: {
            grid: {
              // 關閉上下方向背景格線(留下橫線)
              display: false,
            },
          },
          y: {
            border: {
              // 關閉垂直方向邊界格線(最靠邊的上下方向格線)
              display: false,
              // 背景橫線從實線樣式改虛線樣式
              dash: [3],
            },
          },
        },
      },
      options,
    ),
  })
}
