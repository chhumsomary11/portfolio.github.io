/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mint: { 500: "#abd1c6" },
        forest: { 500: "#004643" },
        milky: { 500: "#f8f5f2" },
        brown: { 100: "#f9bc60", 500: "#e16162" },
      },
    },
  },
  plugins: [],
};
