const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'client/dist'),
  JS: path.resolve(__dirname, 'client/src'),
  SRC: path.resolve(__dirname, 'client/src')
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: paths.SRC,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, '../index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.(png|jpg|jpeg|jfif|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
