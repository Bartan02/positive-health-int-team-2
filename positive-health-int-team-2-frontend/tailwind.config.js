/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./src/routes/**/*.{html,js,svelte,ts}',
    './src/App.svelte',
    './src/components/**/*.{html,js,svelte,ts}',],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Raleway"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: []
};