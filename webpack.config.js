const path = require('path');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'client/dist'),
  JS: path.resolve(__dirname, 'client/src/js'),
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.moin-moin.js'
  },
};
