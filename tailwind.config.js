/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.ts",
    "./src/app/components/**/*.html",
    "./src/app/components/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        ang: {
          text: "#040316",
          background: "#dedede",
          primary: "#2bf360",
          secondary: "#fcff38",
          accent: "#e4df91",
        },
      },
    },
  },
  plugins: [],
};
