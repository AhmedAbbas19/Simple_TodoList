const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const devConfig = {
  //"devtool" : "none" // to remove eval function
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets",
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // to clean output folder before bundling
    new HtmlWebpackPlugin({
      template: "./index.html",
      favicon: "./favicon.ico"
    })
  ]
};

const config = merge(devConfig, common);

module.exports = config;
