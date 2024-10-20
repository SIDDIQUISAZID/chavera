const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xs: "320px",
    },
    extend: {
      container: {
        screens: {
          xs: "100%",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
      colors: {
        theme: {
          dark: "#14BFD9",
          black: "#222222",
          tableHeader: "#F0EDED",
          backgroundColor:'#FAF5FE',
          grey: "#606060",
          border: "#E5E5E5",
          headerColor:'#FFD6DD',
          darkLight:'#FCEEEE',
          purple: "#9C19EC",
          blue: "#1B57F0",
          green: "#1BB24E",
          greyLight: "#F7F7F7",
          white: "#FFFFFF",
          gradientTop:"#EC1944",
          gradientBottom:"#FF6F2B",
          // dark: "rgba(var(--blue-dark) / <alpha-value>)",
          //dark: "rgba(var(--rgb-blue-dark) / <alpha-value>)",
          medium: "rgba(var(--rgb-blue-medium) / <alpha-value>)",
          light: "rgba(var(--rgb-blue-light) / <alpha-value>)",
          lightest: "rgba(var(--rgb-blue-lightest) / <alpha-value>)",
        },
        gray: {
          dark: "rgba(var(--rgb-gray-dark) / <alpha-value>)",
          light: "rgba(var(--rgb-gray-light) / <alpha-value>)",
        },
        coral: "rgba(var(--rgb-coral) / <alpha-value>)",
        peach: "rgba(var(--rgb-peach) / <alpha-value>)",
        // peach: "var(--peach)",
        sand: "var(--sand)",
        sage: "var(--sage)",
      },
      fontFamily: {
        poppins_cf: ["Poppins CF"],
        poppins_w: ["Poppins W"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/line-clamp"),
  ],
};
