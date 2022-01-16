const path = require("path");

module.exports = {
  mode: "development",

  output: {
    filename: "[name].js",
  },

  devtool: "eval-source-map",

  devServer: {
    open: true,
  },
};
