/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors
        primary: {
          DEFAULT: '#3b82f6',
          light: '#3b82f6',
          dark: '#60a5fa',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      const newUtilities = {}
      const delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
      
      delays.forEach(delay => {
        newUtilities[`.animation-delay-${delay}`] = {
          'animation-delay': `${delay}ms`,
        }
      })
      
      addUtilities(newUtilities)
    },
  ],
}
