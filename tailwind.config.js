/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Rubik"],
      },

      colors: {
        light: "#FBFBFB",
        emrald: "#FF7640",
        emraldLight: "#82d9aa",
        black: "#020100",
      },
    },
  },
  plugins: [],
};
