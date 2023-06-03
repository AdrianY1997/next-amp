/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{jsx, js}",
    "./component/**/*.{jsx, js}",
    "./pages/**/*.{jsx, js}",
  ],
  theme: {
    extend: {
      colors: {
        'ice': '#396d7c',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      animation: {
        "fade-out": "fade-out .5s linear"
      },
      keyframes: {
        "fade-out": {
          "0%": {
            "transform": "scale(0.9)",
            "opacity": "0"
          },
          "100%": {
            "transform": "scale(1)",
            "opacity": "1"
          }
        }
      }
    },
  },
};
