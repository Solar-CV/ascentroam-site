/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      maxWidth: { shell: '1200px' },
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        blue: 'var(--blue)',
        red: 'var(--red)',
      },
    },
  },
  plugins: [],
}
