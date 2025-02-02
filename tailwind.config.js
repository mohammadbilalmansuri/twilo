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
      white: "#ffffff",
      black: "#000000",
      blue: "#006ce7",
      red: "#ef4444",
    },
    extend: {
      spacing: {
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
      },
      size: {
        4.5: "1.125rem",
        14: "3.5rem",
        18: "4.5rem",
      },
      borderWidth: {
        1.5: "1.5px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
