/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html, js}", "./dist/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryColor: '#1a82b9',
        secondaryColor: '#12517e',
        tertiaryColor: '#1a2631'
      },
    },
  },
  plugins: [],
}

