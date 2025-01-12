/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {      
      colors: {
      primary: '#D91E36', // Vibrant indigo
      "primary-content": '#FFFFFF', // White
      secondary: '#EF7674', // Deep blue
      "secondary-content": '#000000', // White
      accent: '#EC4899', // Pink accent
      neutral: '#F3F4F6', // Light background
      dark: '#1F2937', // Dark gray
    },
      keyframes: {
        flyout: {
          '0%': { transform: 'translateY(100)', opacity: 1 },
          '100%': { transform: 'translateY(-1000)', opacity: 0 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
        },
      },
      animation: {
        flyout: 'flyout 2s ease-in-out forwards',
        fadeout: 'fadeOut 2s ease-in-out forwards',
        pulse: 'pulse 2s infinite',
      },
    }
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#E3170A",
          "secondary": "#D6A99A",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};