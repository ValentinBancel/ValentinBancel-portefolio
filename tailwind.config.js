/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        'manroperegular': ['ManropeRegular', 'sans-serif'],
        'HelveticaNeue': ['Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}