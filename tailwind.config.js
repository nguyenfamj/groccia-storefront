const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@medusajs/ui-preset')],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/*.{js,ts,jsx,tsx}',
    './node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width margin',
        height: 'height',
        bg: 'background-color',
        display: 'display opacity',
        visibility: 'visibility',
        padding: 'padding-top padding-right padding-bottom padding-left',
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', ...defaultTheme.fontFamily.serif],
        roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.serif],
        gotag: ['var(--font-gotag)', ...defaultTheme.fontFamily.sans],
        poppins: ['var(--font-poppins)', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        primary: {
          default: '#00524B',
          500: '#00524B',
          600: '#003D36',
          700: '#002924',
        },
        secondary: '#C5C2AA',
        accent: '#785469',
        neutral: '#F1F1F1',
        'input-placeholder': '#555555',
        info: '',
        success: '',
        warning: '',
        error: '',
        'price-default': '#21221F',
        'price-sale': '#EE4266',
      },
      borderRadius: {
        none: '0px',
        soft: '2px',
        base: '4px',
        rounded: '8px',
        large: '16px',
        circle: '9999px',
      },
      maxWidth: {
        '8xl': '100rem',
      },
      fontSize: {
        '3xl': '2rem',
      },
      flex: {
        carousel: '0 0 100%',
        'carousel-slide': '0 0 50%',
        'carousel-slide-sm': '0 0 calc(100%/3)',
        'carousel-slide-lg': '0 0 calc(100%/5)',
        'carousel-slide-xl': '0 0 calc(100%/6)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        grocciaLight: {
          primary: '#00524B',
          secondary: '#C5C2AA',
          accent: '#785469',
          neutral: '#F1F1F1',
        },
      },
    ],
  },
  plugins: [
    require('tailwindcss-radix')(),
    require('daisyui'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.backface-visible': {
          'backface-visibility': 'visible',
          '-moz-backface-visibility': 'visible',
          '-webkit-backface-visibility': 'visible',
          '-ms-backface-visibility': 'visible',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
          '-moz-backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          '-ms-backface-visibility': 'hidden',
        },
      });
    }),
  ],
};
