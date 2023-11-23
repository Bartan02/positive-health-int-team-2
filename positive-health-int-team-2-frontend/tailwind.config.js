/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/routes/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: []
};