/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#37353E",
        secondary: "#44444E",
        accent: "#715A5A",
        highlight: "#D3DAD9",
      },
    },
  },
  plugins: [],
}