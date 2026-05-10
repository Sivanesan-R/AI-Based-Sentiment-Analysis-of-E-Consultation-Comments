/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#fcf9f3',
        darkgreen: '#2f4f2f',
        lightgreen: '#a3d9a5',
      },
    },
  }
  ,
  plugins: [],
}
