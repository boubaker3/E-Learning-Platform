/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
    theme: {
    extend: {},
    screens: {
      'sm': '576px',
      // => @media (min-width: 640px) { ... }

      'md': '960px',
      // => @media (min-width: 768px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1536px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '3072px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      transparent: 'transparent',
      'primary': '#1F1F1F',
      'secondary': '#2E2E2E',
      'primary-variant': '#079E0E',
       'inputs':"#2E2E2E",
       'texts':"#fff",
       
    },
  
  },
  plugins: [],
}
