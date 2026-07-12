/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9F2089",
        secondary: "#6B21A8",
        lightbg: "#F8F8F8",
        textdark: "#222222",
      },
      borderRadius: {
        xl2: "16px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: 0.6 },
          "100%": { transform: "scale(4)", opacity: 0 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.4s ease-out forwards",
        ripple: "ripple 0.6s linear",
      },
    },
  },
  plugins: [],
};