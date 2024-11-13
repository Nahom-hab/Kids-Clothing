/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ['DynaPuff', 'cursive'], // Add the font with a fallback
      },
    },
  },
  plugins: [],
}

