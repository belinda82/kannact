/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C7A7B',
        secondary: '#68D391',
        background: '#F7FAFC',
        danger: '#E53E3E',
      },
    },
  },
  plugins: [],
}
