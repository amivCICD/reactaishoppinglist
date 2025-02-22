/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f8c7fc",       
          "secondary": "#2cf9a7",       
          "accent": "#f48c69",       
          "neutral": "#1B161D",       
          "base-100": "#3E4246",       
          "info": "#92B1E7",       
          "success": "#209766",       
          "warning": "#F4B62F",
          "error": "#E75136",
        },
      },
    ],
  },
  content: [
    "./src/**/*.{html,js,jsx}",
    "./reactShopCart/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        "reverse-spin" : "reverse-spin 1s linear infinite"
      },
      keyframes: {
        "reverse-spin" : {
          from: {
            transform: 'rotate(360deg)'
          }
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
