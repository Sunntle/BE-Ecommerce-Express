const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
    clean: true,
  },
  target: "node",
  mode: 'production',
  resolve: {
    extensions: [".js"],
    fallback: {
        "mock-aws-s3": false,
        "pg-hstore": false,
        "nock": false,
        "aws-sdk": false,
      },
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
};