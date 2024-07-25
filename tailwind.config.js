/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
  ],

  theme: {
    extend: {
      colors: {
        hover: "#EFF4FD",
        youtubes: "#FE4442",
        gradient: {
          90: "linear-gradient(90deg, #C443AE 0%, #F73B31 51.04%, #FFCF23 100%)",
        },
        aspectRatio: {
          '9/16': '9 / 16',
        },
      },
    },
  },

  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
};
