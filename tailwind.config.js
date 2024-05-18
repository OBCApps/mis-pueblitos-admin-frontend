/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}',"./node_modules/flowbite/**/*.js"],
  },
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#F33535',
        fondo: '#FEFBFB',
        secondary: '#33425B',
        terceary: '#29252C',
        
      },
    },
  },

  // -------- CONFIGURATION - FLOWBITE ------------- \\
  plugins: [
    require('flowbite/plugin')
  ],
  //content: ["./node_modules/flowbite/**/*.js"]
}
