/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e6edff",
          200: "#ccdaff",
          300: "#C6BDF9",
          400: "#80a2ff",
          500: "#6F58F8",
          600: "#1a5bff",
          700: "#0041e6",
          800: "#002480",
          900: "#00164d",
          DEFAULT: "#6F58F8",
        },
        neutral: { 500: "#D9D9D9", 600: "#b0b0b0", DEFAULT: "#D9D9D9" },
        black: "#353535",
        available: { 500: "#00C853", 800: "#008035" },
        unknown: { 500: "#FFD600", 800: "#b39500" },
        unavailable: { 500: "#FF4646", 600: "#ff0000", 800: "#e60000" },
      },
      spacing: {
        sm: "5px",
        md: "15px",
        lg: "20px",
        xl: "40px",
      },
    },
  },
  plugins: [],
  safelist: [
    // allows all widths and heights
    { pattern: /(w|h)-\[*.+\]*/ },
    // allows a paddings and margins
    { pattern: /(p|m)(t|b|r|l|)*-\[*\w+\]*/ },
    { pattern: /bg-(neutral)-\d{3}/ },
  ],
};
