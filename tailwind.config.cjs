/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./index.html"

  ],
  theme: {
    extend: {
      letterSpacing: {
        letterButton:'0.03em'
      }, 
      fontFamily:{
        'nunitoRegular':['Nunito Sans', 'sans-serif']
      }

    },
  },
  plugins: [],
}
