/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   
  ],
  
  theme: {
    extend: {
      colors: {
        "primary-200": '#ffbf00',
        "primary-100": '#ffc929',
        "secondary-200": '#00b050',
        "secondary-300": 'rgb(12, 131, 31)',
        "secondary-100": '#0b1a78',
      },
      keyframes: {
        bounceCart: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggleCart: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' },
        },
      },
      animation: {
        bounceCart: 'bounceCart 2s ease-in-out infinite',
        wiggleCart: 'wiggleCart 0.5s ease-in-out 2',
      },
    },
  },
  plugins: [],
}

