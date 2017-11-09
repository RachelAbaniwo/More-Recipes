"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (status, statusCode, data, res) {
  return res.status(statusCode).json({
    status: status, data: data
  });
};