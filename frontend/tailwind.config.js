/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основная цветовая палитра для автомобильной тематики
        'auto-gray': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1e21',
        },
        'auto-beige': {
          50: '#fdfcfb',
          100: '#f8f6f2',
          200: '#f1ece4',
          300: '#e8e0d4',
          400: '#d4c8b4',
          500: '#bfb094',
          600: '#a8987a',
          700: '#8c7a5f',
          800: '#6f604c',
          900: '#574c3d',
        },
        'auto-brown': {
          50: '#faf8f6',
          100: '#f2ede8',
          200: '#e6dcd3',
          300: '#d4c4b5',
          400: '#bda58d',
          500: '#a38666',
          600: '#8a6d52',
          700: '#705743',
          800: '#5a4535',
          900: '#48382a',
        },
        'auto-accent': {
          silver: '#c0c0c0',
          chrome: '#e8e8e8',
          leather: '#8b4513',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'car-texture': "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}