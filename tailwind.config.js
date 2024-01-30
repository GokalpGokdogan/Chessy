/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: { A700_dd: "#ffffffdd", A700: "#ffffff" },
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'orange': '#ea652d',
      blue_gray: { 100: "#d9d9d9", 200: "#b7c0d8" },
      black: {
        900: "#000000",
        "900_3f": "#0000003f",
        "900_26": "#00000026",
        "900_1e": "#0000001e",
      },
      indigo: { '500': "#382ad6", "500_1e": "#382ad61e" },
      gray: { 100: "#f4f7fa" },
    },
    boxShadow: {
      bs1: "0px 1px  5px 0px #0000001e",
      bs2: "inset 0px 4px  4px 0px #0000003f",
      bs: "0px 50px  130px 0px #00000026",
    },
    fontFamily: { mont: ['Montserrat Alternates', 'sans-serif'] },
    textShadow: { ts: "0px 4px  4px #0000003f" },
    fontWeight: {
      'light': '300',
      'regular': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700',
      'extrabold': '800',
      'black': '900',
    },
    extend: {},
  },
  plugins: [],
}

