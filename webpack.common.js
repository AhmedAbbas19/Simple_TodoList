module.exports = {
  entry: { vendors: "./App/vendors", index: "./App/index" },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
};
