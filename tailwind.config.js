/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        logo: "url('/img/logo.png')",
        heroBg: 'url("/img/bg.png")',
      },
      fontFamily: {
        fairuz: ['fairuz', 'sans-serif'],
      },
      colors: {
        main: 'var(--primary-color)',
      },
      zIndex: {
        90: '90',
        100: '100',
        101: '101',
        102: '102',
        103: '103',
        104: '104',
      },
      boxShadow: {
        top: {
          sm: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
          md: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          lg: '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          xl: '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
          '3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
          topxl: '0 -35px 60px rgba(0, 0, 0, 0.3)',
        },
        topmd:
          '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        toplg:
          '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        topxl: '0 -20px 60px rgba(0, 0, 0, 0.3)',
      },
      opacity: {
        15: '.15',
      },
      height: {
        s30: '30vh',
        s40: '40vh',
        s50: '50vh',
        s60: '60vh',
        s65: '65vh',
        s70: '70vh',
        s75: '75vh',
        s80: '80vh',
        s85: '85vh',
        s90: '90vh',
      },
      fontSize: {
        xxs: ['0.7rem', '0.75rem'],
        '2xs': ['0.625rem', '0.75rem'],
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
      backgroundColor: ['active'],
      borderWidth: ['hover', 'focus'],
      rotate: ['active', 'group-hover'],
    },
    textTransform: ({ after }) => after(['first-letter']),
  },
  plugins: [],
}
