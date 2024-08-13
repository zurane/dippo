/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter Tight"],
      },

      colors: {
        light: "#FBFBFB",
        emrald: "#32DE8A",
      },
    },
  },
  plugins: [],
};
