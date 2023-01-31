/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:3080/graphql",
      },
    },
  },
  devtool: "source-map",
  entry: "./src/index.tsx",
  mode: process.env.MODE,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.ttf/,
        type: "asset/resource",
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.EnvironmentPlugin({ MODE: process.env.MODE }),
    new webpack.ProvidePlugin({ React: "react" }),
    new webpack.SourceMapDevToolPlugin({ filename: "[file].map[query]" }),
    new HtmlWebpackPlugin({ template: "public/index.html" }),
  ],
  resolve: {
    alias: {
      "#api": path.resolve(process.cwd(), "src/api"),
      "#components": path.resolve(process.cwd(), "src/components"),
      "#models": path.resolve(process.cwd(), "src/models"),
      "#src": path.resolve(process.cwd(), "src"),
      "#styles": path.resolve(process.cwd(), "src/styles"),
      "#utils": path.resolve(process.cwd(), "src/utils"),
      "#views": path.resolve(process.cwd(), "src/views"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
}
