/** @type {import('tailwindcss').Config} */
export default {
  content: ["./lib/**/*.{js,ts,jsx,tsx}", "./test/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#00BCF0",
        },
        primary: {
          dark: "#171717",
          dark2: "#1F2329",
          gray: "#CFD3D9",
          gray2: "#666D76",
          gray3: "#BDC2C8",
        },
      },
      boxShadow: {
        "light-card":
          "0px 2px 8px 2px rgba(31, 35, 41, 0.02), 0px 2px 4px 0px rgba(31, 35, 41, 0.02), 0px 1px 2px -2px rgba(31, 35, 41, 0.02)",
        1: "0px 4px 8px -8px rgba(31, 35, 41, 0.06), 0px 6px 12px 0px rgba(31, 35, 41, 0.04), 0px 8px 24px 8px rgba(31, 35, 41, 0.04)",
        "light-menu":
          "0px 4px 8px 0px rgba(31, 35, 41, 0.03), 0px 3px 6px -6px rgba(31, 35, 41, 0.05), 0px 6px 18px 6px rgba(31, 35, 41, 0.03)",
      },
    },
  },
  plugins: [],
};
