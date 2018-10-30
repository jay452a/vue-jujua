// https://github.com/michael-ciniawsky/postcss-load-config
const path = require("path");
module.exports = {
  plugins: {
    "postcss-import": {
    },
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    // "autoprefixer": {},
    "postcss-cssnext": {
      features: {
        customProperties: {
          variables: {
            mainColor: "#ff8922",
            activeColor: "#ececec"
          }
        },
        applyRule: {
          sets: {
            borderLabel: {
              /* Declaration properties can either be camel or kebab case. */
              display: "flex",
              alignItems: "center"
            }
          }
        }
      }
    },
    "postcss-px-to-viewport": {
      viewportWidth: 750,
      viewportHeight: 1206,
      unitPrecision: 3,
      viewportUnit: "vw",
      selectorBlackList: [".vpBlack"],
      minPixelValue: 1,
      mediaQuery: false
    }
  }
};
