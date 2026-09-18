/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {
      colors: {
        monochrome: {
          100: "#fafafa",
          900: "#111111"
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};