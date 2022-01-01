/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: process.env.FRONTEND_PORT,
    proxy: {
      // http://[Service name of backend in compose.dev.yml]:[backend port].
      '/api': `http://backend:${process.env.BACKEND_PORT}`,
    },
  },
  devtool: 'source-map',
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    sourceMapFilename: '[name].js.map',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '#components': path.resolve(process.cwd(), 'src/components'),
      '#models': path.resolve(process.cwd(), 'src/models'),
      '#src': path.resolve(process.cwd(), 'src'),
      '#styles': path.resolve(process.cwd(), 'src/styles'),
      '#utils': path.resolve(process.cwd(), 'src/utils'),
      '#views': path.resolve(process.cwd(), 'src/views'),
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map[query]',
    }),
    new HTMLWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
}
