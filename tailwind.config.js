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
        secondary: '#33425B',
        terceary: '#29252C',
        background: '#ffff',
        danger: '#fcffe6',
        success: '#f4ffb8',
        alert: '#eaff8f',
      },
    },
  },

  // -------- CONFIGURATION - FLOWBITE ------------- \\
  plugins: [
    require('flowbite/plugin')
  ],
  //content: ["./node_modules/flowbite/**/*.js"]
}
