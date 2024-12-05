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
          gray: "#CFD3D9",
          gray2: "#666D76",
          gray3: "#BDC2C8",
        },
      },
    },
  },
  plugins: [],
};
