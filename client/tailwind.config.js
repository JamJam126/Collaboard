/** @type {import('tailwindcss').Config} */
import colors from './src/style/colors.js';

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#161B27",
        },
        border: {
          DEFAULT: "#1B2434",
          light: ""
        },
        brand: {
          yellow: "#FCA311"
        },
        card: colors.card,
      }
    },
  },
  plugins: [],
}

