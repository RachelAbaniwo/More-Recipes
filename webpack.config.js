const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'server/public'),
  JS: path.resolve(__dirname, 'client/src'),
  SRC: path.resolve(__dirname, 'client/src')
};

// Webpack configuration
module.exports = {
  entry: ['babel-polyfill', path.join(paths.JS, 'app.jsx')],
  output: {
    path: paths.DIST,
    filename: 'app.[hash].js',
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
    new ExtractTextPlugin('style.[hash].css'),
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

