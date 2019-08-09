const path = require("path");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
  entry: "./dist/index.js",
  target: "node",
  mode: "production",
  output: {
    filename: "hahjong-helper.min.js",
    path: path.resolve(__dirname, "min")
  },
  plugins: [new LodashModuleReplacementPlugin()]
};
