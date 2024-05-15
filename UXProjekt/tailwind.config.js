/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'headline': ['Montserrat', 'sans-serif'], // Använd Montserrat för rubriker

        'sans': ['Inter', 'sans-serif'] // Använd Inter som standard sans-serif font
      },
      fontSize: {
        'headline1': '24px', 
        'headline2': '20px', 
        'large-text': '16px',
        'small-text': '12px'
      },
      fontWeight: {
        'headline2': '200' // Definiera vikt specifikt för denna användning
      },
      colors: {
        'info-bg': '#D9D9D9',
        'view-bg': '#f4f4f8',
        'orange': '#f2a32d',
        'white': '#f8f8f8',
        'blue': '#425890',
        'grey': '#919193'
      }
    },
  },
  plugins: [require("daisyui")]
}

