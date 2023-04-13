/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      fontFamily: {
        'roboto': ['roboto', 'sans-serif'],
        'inter' : ['Inter', 'sans-serif']
      },
    extend: {
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar-hide')
  ],
};
