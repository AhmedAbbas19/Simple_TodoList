const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const prodConfig = {
  devtool: "none", // to remove eval function
  mode: "production",
  output: {
    filename: "[name].[chunkhash].bundle.js",
    // [hash],[chunkhash] to solve caching problem
    // [contenthash] to request the changed file only instead of all the js files
    path: path.resolve(__dirname, "build")
  },
  optimization: {
    // this disables the default js optimizer
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./index.html",
        favicon: "./favicon.ico",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  module: {
    rules: [
      {
        // ES6 to ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              limit: 30000
            }
          },
          "image-webpack-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // to clean output folder before bundling
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};

const config = merge(prodConfig, common);

module.exports = config;
