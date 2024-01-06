/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'small-shake': {
          "0%": {
            transform: "translateX(0rem)"
          },
          "25%": {
            transform: "translateX(-1px)"
          },
          "75%": {
            transform: "translateX(1px)"
          },
          "100%": {
            transform: "translateX(0rem)"
          }
        }
      },
      animation: {
        'small-shake': 'small-shake 0.5s both',
      },
    }
  },
  plugins: [require("daisyui"), require('tailwindcss-animated')],
  daisyui: {
    themes: ["light", "dark", "bumblebee"],
  }
}

