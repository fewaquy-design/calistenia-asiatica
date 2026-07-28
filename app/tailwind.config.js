/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d64d7a",
        "primary-dark": "#b83860",
      },
      fontFamily: {
        brand: ["Anton", "sans-serif"],
        sans: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
}

