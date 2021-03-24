/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colors = require('tailwindcss/colors');

function screenHeight({ addComponents }) {
  addComponents({
    '.h-68': {
      height: '17rem',
    },
    '.h-72': {
      height: '18rem',
    },
    '.h-76': {
      height: '20rem',
    },
  });
}
function half(value) {
  return value.replace(/\d+(.\d+)?/, (number) => number / 2);
}

function addFlexGap({ addUtilities, e, theme, variants }) {
  Object.entries(theme('gap')).forEach(([key, value]) =>
    addUtilities(
      {
        [`.flex-gap-${e(key)}`]: {
          margin: `-${half(value)}`,
          '& > *': {
            margin: half(value),
          },
        },
        [`.flex-gap-x-${e(key)}`]: {
          marginRight: `-${half(value)}`,
          marginLeft: `-${half(value)}`,
          '& > *': {
            marginRight: half(value),
            marginLeft: half(value),
          },
        },
        [`.flex-gap-y-${e(key)}`]: {
          marginTop: `-${half(value)}`,
          marginBottom: `-${half(value)}`,
          '& > *': {
            marginTop: half(value),
            marginBottom: half(value),
          },
        },
      },
      variants('gap')
    )
  );
}

module.exports = {
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        violet: colors.violet,
        lightBlue: colors.lightBlue,
        cyan: colors.cyan,
        teal: colors.teal,
        emerald: colors.emerald,
        lime: colors.lime,
        amber: colors.amber,
        warmGray: colors.warmGray,
        trueGray: colors.trueGray,
        coolGray: colors.coolGray,
        blueGray: colors.blueGray,
        accent: {
          50: '#fdf9f9',
          100: '#fdeef4',
          200: '#fbcde8',
          300: '#fba3d5',
          400: '#fc68b4',
          500: '#fc3e8f',
          600: '#f82468',
          700: '#e0245e',
          800: '#b4183f',
          900: '#8f1432',
        },
        primary: {
          50: '#47525d',
          100: '#3d4853',
          200: '#333e49',
          300: '#29343f',
          400: '#1f2a35',
          500: '#15202b',
          600: '#0b1621',
          700: '#010c17',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    screenHeight,
    addFlexGap,
  ],
};
