/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "680px",
      md: "880px",
      lg: "1080px",
      xl: "1280px",
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
    },
  },
  plugins: [],
};
