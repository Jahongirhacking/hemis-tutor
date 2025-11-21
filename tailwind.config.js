/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: ['"Bebas Neue"', 'sans-serif'],
        accent: ['Anton', 'sans-serif'],
        brand: ['"TikTok Sans"', 'Roboto', 'sans-serif'],
        body: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 20px 45px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
