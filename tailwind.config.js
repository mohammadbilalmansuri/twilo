/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "660px",
      md: "840px",
      lg: "1024px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#222831",
      secondary: "#EEEEEE",
      neutral: "#31363F",
      accent: "#F6B17A",
    },
    extend: {
      fontFamily: {
        monda: ['"Monda"', '"sans-serif"', '"system-ui"'],
        "zen-dots": ['"Zen Dots"', '"Monda"', '"sans-serif"', '"system-ui"'],
      },
      spacing: {
        14: "3.5rem",
        15: "3.75rem",
      },
    },
  },
  plugins: [],
};
