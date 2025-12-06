/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cascadia': ['Cascadia Code', 'monospace'],
      },
      colors: {
        'code-blue': '#569cd6',
        'code-yellow': '#dcdcaa',
        'code-green': '#6A9955',
        'bg-dark': '#1e1e1e',
        'bg-darker': '#1a1a1a',
        'text-light': '#d4d4d4',
      },
      animation: {
        'gradient': 'gradient 4s linear infinite',
      },
      keyframes: {
        'gradient': {
          '0%': { 'background-position': '0% center' },
          '100%': { 'background-position': '200% center' },
        }
      },
    },
  },
  plugins: [],
}


