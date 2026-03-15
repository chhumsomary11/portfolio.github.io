/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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

  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.3s ease",
      },
    },
  },
  plugins: [],
};
