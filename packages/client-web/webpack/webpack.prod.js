const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  output: {
    filename: "[name]_[contenthash:16].js",
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
};
