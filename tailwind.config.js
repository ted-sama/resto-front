const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Dancing: ["Dancing Script", ...defaultTheme.fontFamily.sans],
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#f5894d",
        "primary-dark": "#c26c3c",
      },
    },
  },
  plugins: [],
};
