'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkInput = require('../helpers/checkInput');

exports.default = function (req, res, next) {
  var errors = [];
  if (!req.body.email) {
    errors.push('Email Address is required!');
  }
  if (req.body.email && !(0, _checkInput.checkEmail)(req.body.email)) {
    errors.push('Email format is wrong, enter valid email address');
  }
  if (!req.body.password) {
    errors.push('Password is required!');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors, message: 'Please fix the validation errors' });
  }
  next();
};