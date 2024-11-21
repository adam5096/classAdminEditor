/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
// 匯入並取出 tailwindcss 預設字形物件 fontFamily
const { fontFamily } = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': colors.zinc
      },
      fontFamily: {
        sans: ["Noto Sans TC", ...fontFamily.sans],
      },
      boxShadow: {
        'lg-top':'0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
}

