/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/src/img/header-bg.jpg')",
        headertest:
          "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/src/img/header-bg.jpg')",
      },
      backgroundPosition: {
        header: "0% 50%",
      },
      fontFamily: {
        asap: ["Asap", "sans-serif"],
      },
      gridTemplateColumns: {
        todos: "1fr 12fr 1fr 1fr",
      },
    },
  },
  plugins: [],
};
