/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./imports/ui/**/*.{svelte,js}",
    "./client/*.html",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      dark: colors.gray,
      alfa: colors.sky,
      beta: colors.rose,
    },
    extend: {},
  },
  plugins: [],
}