/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        c50: "rgb(240 253 250)",
        c100: "rgb(204 251 241)",
        c200: "rgb(153 246 228)",
        c300: "rgb(94 234 212)",
        c400: "rgb(45 212 191)",
        c500: "rgb(20 184 166)",
        c600: "rgb(13 148 136)",
        c700: "rgb(15 118 110)",
        c800: "rgb(17 94 89)",
        c900: "rgb(19 78 74)",
        c950: "rgb(4 47 46)",
      },
      backgroundImage: (theme) => ({
        "signin-image": "url('/bg-images/signin.jpg')",
        "dark-signin-image": "url('/bg-images/dark-signin.jpg')",
        "home-image": "url('/bg-images/home.jpg')",
        "dark-home-image": "url('/bg-images/images.jpeg')",
      }),
    },
  },
  plugins: [],
};
