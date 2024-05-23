/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Slab', 'serif'],
      },
      textDecorationThickness: {
        '3': '3px',
      },
      borderWidth: {
        '3': '3px',
      },
      colors: {
        'apricot': '#E9A17B',
        'gray':'#595959'
      },
    },
  },
  plugins: [],
}

