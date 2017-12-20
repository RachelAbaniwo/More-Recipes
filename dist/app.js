'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

require('dotenv').config();

var port = parseInt(process.env.PORT, 10) || 4044;

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// enable cors for all requests
app.use((0, _cors2.default)());

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
// mount all routes on /api routes

app.use('/api/v1', _routes2.default);

app.get('*', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, 'public', 'index.html'));
});

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use(function (req, res) {
  res.json('UNKNOWN REQUEST.');
});

_models2.default.sequelize.sync().then(function () {
  app.listen(port, function () {
    console.log('server is running');
  });
});

exports.default = app;