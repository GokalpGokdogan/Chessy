/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700_dd: "#ffffffdd", A700: "#ffffff" },
        blue_gray: { 100: "#d9d9d9", 200: "#b7c0d8" },
        black: {
          900: "#000000",
          "900_3f": "#0000003f",
          "900_26": "#00000026",
          "900_1e": "#0000001e",
        },
        indigo: { 500: "#382ad6", "500_1e": "#382ad61e" },
        gray: { 100: "#f4f7fa" },
      },
      boxShadow: {
        bs1: "0px 1px  5px 0px #0000001e",
        bs2: "inset 0px 4px  4px 0px #0000003f",
        bs: "0px 50px  130px 0px #00000026",
      },
      fontFamily: { montserratalternates: "Montserrat Alternates" },
      textShadow: { ts: "0px 4px  4px #0000003f" },
      fontWeight: {
        'bold': '700',
      },
    },
  },
  plugins: [],
}