/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#e6edff",
          200: "#ccdaff",
          300: "#b3c7ff",
          400: "#80a2ff",
          500: "#3F75FF",
          600: "#1a5bff",
          700: "#0041e6",
          800: "#002480",
          900: "#00164d",
          DEFAULT: "#3F75FF",
        },
        neutral: "#D9D9D9",
        black: "#353535",
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
    { pattern: /(w|h)-\[*\w+\]*/ },
    { pattern: /(p|m)(t|b|r|l|)*-\[*\w+\]*/ },
  ],
};
