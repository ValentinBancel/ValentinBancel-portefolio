/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.disabled-click': {
          pointerEvents: 'none',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}