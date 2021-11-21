const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const outputPath = path.resolve(__dirname, "../dist/");

const commons = ["react", "react-dom"];

function getCssLoaders(modules = false) {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: modules
          ? {
              localIdentName: "[name]_[local]_[hash:base64:5]",
              exportLocalsConvention: "camelCase",
            }
          : false,
        url: true,
        importLoaders: 2,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [require("autoprefixer")],
        },
      },
    },
    {
      loader: "sass-loader",
    },
  ];
}

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src/index"),
  },

  output: {
    path: outputPath,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: new RegExp(`[\\/]node_modules[\\/](${commons.join("|")})[\\/]`),
          name: "common",
          chunks: "all",
        },
      },
    },
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          "cache-loader",
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "my-markdown-loader",
            options: {
              dir: "./src/components",
            },
          },
        ],
      },
      {
        test: /\.(m|module)\.s?css$/,
        use: getCssLoaders(true),
      },
      {
        test: /\.s?css$/,
        use: getCssLoaders(false),
        exclude: /\.(m|module)\.s?css$/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: "write-references",
        configFile: path.resolve(__dirname, "../tsconfig.json"),
        typescript: {
          diagnosticOptions: {
            syntactic: true,
          },
        },
      },
    }),

    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      chunks: ["main"],
    }),
  ],
};
