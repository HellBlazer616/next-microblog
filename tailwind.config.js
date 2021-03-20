/* eslint-disable no-unused-vars */
/* eslint-disable global-require */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function screenHeight({ addComponents }) {
  addComponents({
    ".h-screen-oiiu": {
      "min-height": "calc(100vh - 76px)",
    },
    ".h-68": {
      height: "17rem",
    },
    ".h-72": {
      height: "18rem",
    },
    ".h-76": {
      height: "20rem",
    },
  });
}
function half(value) {
  return value.replace(/\d+(.\d+)?/, (number) => number / 2);
}

function addFlexGap({ addUtilities, e, theme, variants }) {
  Object.entries(theme("gap")).forEach(([key, value]) =>
    addUtilities(
      {
        [`.flex-gap-${e(key)}`]: {
          margin: `-${half(value)}`,
          "& > *": {
            margin: half(value),
          },
        },
        [`.flex-gap-x-${e(key)}`]: {
          marginRight: `-${half(value)}`,
          marginLeft: `-${half(value)}`,
          "& > *": {
            marginRight: half(value),
            marginLeft: half(value),
          },
        },
        [`.flex-gap-y-${e(key)}`]: {
          marginTop: `-${half(value)}`,
          marginBottom: `-${half(value)}`,
          "& > *": {
            marginTop: half(value),
            marginBottom: half(value),
          },
        },
      },
      variants("gap")
    )
  );
}

module.exports = {
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    screenHeight,
    addFlexGap,
  ],
};
