import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          300: "#ff561a",
          200: "#ff6b3d",
          100: "#ff7e57",
          50: "#ff906e",
        },
        background: {
          100: "#fcfcfc",
          50: "#fffff",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
