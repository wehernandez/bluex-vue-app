/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors.js";
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors:{
        primary:{
          DEFAULT: '#0038ae',
          60: '#0b3993',
          70: '#197ac1',
        },
        secondary:{
          40: '#009ade',
          DEFAULT: '#00a0e9',
        },
        gray: {
          10: '#EEEEEE',
          15: '#F1F1F1',
          20: '#A2A2A2',
          30: '#7B7B7B',
          50: '#585858',
          90: '#141414',
        },
      },
      fontFamily: {
        lexend: ['Roboto', "sans-serif"],
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
    },
  },
  plugins: [],
}
