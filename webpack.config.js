/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'node',
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  // Need this to avoid error when working with Express
  externals: [nodeExternals()],
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    }),
  ],
};
