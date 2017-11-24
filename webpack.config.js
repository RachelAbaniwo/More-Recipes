const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'client/dist'),
  JS: path.resolve(__dirname, 'client/src/js'),
  SRC: path.resolve(__dirname, 'client/src')
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.moin-moin.js'
  },
  devServer: {
    contentBase: paths.SRC
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    })
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
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
