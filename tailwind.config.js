/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'channel': {
          'purple-light': '#c8bdff',
          'navy': '#152840',
          'dark': '#262626',
          'gray-light': '#ebebeb',
          'purple': '#562efd',
          'black': '#000000',
          'white': '#fffffe',
        },
      },
    },
  },
  plugins: [],
}
