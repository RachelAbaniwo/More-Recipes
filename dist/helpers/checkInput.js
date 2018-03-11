"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
   * Checks input and returns false if email is invalid
   *
   * @param {string} email
   * @returns {boolean} returned to client
   */
var checkEmail = exports.checkEmail = function checkEmail(email) {
  var check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return check.test(email);
};
/**
   * Checks input and returns false if non alphanumeric characters are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {boolean} returned to client
   */
var checkname = exports.checkname = function checkname(name) {
  var check = /^[A-Za-z]{3,15}$/;
  return check.test(name);
};
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {boolean} returned to client
   */
var checkUsername = exports.checkUsername = function checkUsername(name) {
  var check = /^[A-Za-z0-9_-]{3,15}$/;
  return check.test(name);
};
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 6 To 15
   * @param {string} text
   * @returns {boolean} returned to client
   */
var checkPassword = exports.checkPassword = function checkPassword(text) {
  var check = /^[.A-Za-z0-9_-]{6,15}$/;
  return check.test(text);
};
/**
   * Checks input and returns false if characters
   * include blank spaces
   * @param {text} text
   * @returns {boolean} returned to client
   */
var checkField = exports.checkField = function checkField(text) {
  var check = /[^\S\r\n]{1,}$/;
  return check.test(text);
};
/**
   * Checks input and returns null if characters
   * include blank spaces
   * @param {text} params
   * @returns {text} returned to client
   */
var returnParameter = exports.returnParameter = function returnParameter(params) {
  var check = /[^\S\r\n]{1,}$/;
  if (!check.test(params)) {
    return params;
  }return null;
};
/**
   * Checks input and returns false if non alphanumeric characters are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {string} returned to client
   */
var returnName = exports.returnName = function returnName(name) {
  var check = /^[A-Za-z]{3,15}$/;
  if (check.test(name)) {
    return name;
  }return null;
};
/**
   *Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {string} returned to client
   */
var returnUsername = exports.returnUsername = function returnUsername(name) {
  var check = /^[A-Za-z0-9_-]{3,15}$/;
  if (check.test(name)) {
    return name;
  }return null;
};
/**
   * Checks input and returns false if email is invalid
   *
   * @param {string} email
   * @returns {boolean}  returned to client
   */
var returnEmail = exports.returnEmail = function returnEmail(email) {
  var check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (check.test(email)) {
    return email;
  }return null;
};
/**
   * Checks input and returns false if characters that are not
   * alphanumeric characters, _ and - are inputed
   * number of Characters must be from 6 To 15
   * @param {string} password
   * @returns {boolean} returned to client
   */
var returnPassword = exports.returnPassword = function returnPassword(password) {
  var check = /^[.A-Za-z0-9_-]{6,15}$/;
  if (check.test(password)) {
    return password;
  }return null;
};