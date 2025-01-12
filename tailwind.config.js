/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './node_modules/flyonui/dist/js/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1', // Vibrant indigo
        secondary: '#4F46E5', // Deep blue
        accent: '#EC4899', // Pink accent
        neutral: '#F3F4F6', // Light background
        dark: '#1F2937', // Dark gray
      },
      keyframes: {
        flyout: {
          '0%': { transform: 'translateY(100%)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
      },
      animation: {
        flyout: 'flyout 2s ease-in-out infinite',
      },
    }
  },
  plugins: [
    require("flyonui"),
    require("flyonui/plugin") // Optional
  ],
  flyonui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "soft"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include FlyonUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    vendors: false, // default is false when true add customize css for apexChart, editor.js, flatpickr, fullcalendar, notyf, raty-js
    logs: true, // Shows info about FlyonUI version and used config in the console when building your CSS
    themeRoot: ":root" // The element that receives theme color CSS variables
  }
};