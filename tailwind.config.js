/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ang: {
          orange: "hsl(var(--color-orange) / <alpha-value>)",
          white: "hsl(var(--color-white) / <alpha-value>)",
          black: "hsl(var(--color-black) / <alpha-value>)",
          redAlert: "hsl(var(--color-redAlert) / <alpha-value>)",
          greenAlert: "hsl(var(--color-greenAlert) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
