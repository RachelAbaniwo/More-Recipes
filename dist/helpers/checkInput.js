"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEmail = checkEmail;
exports.checkname = checkname;
exports.checkUsername = checkUsername;
exports.checkPassword = checkPassword;
exports.checkField = checkField;
exports.returnParameter = returnParameter;
exports.returnName = returnName;
exports.returnUsername = returnUsername;
exports.returnEmail = returnEmail;
exports.returnPassword = returnPassword;
/**
   * Checks input and returns false if email is invalid
   *
   * @param {string} email
   * @returns {boolean} returned to client
   */
function checkEmail(email) {
  var check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return check.test(email);
}
/**
   * Checks input and returns false if non alphanumeric characters are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {boolean} returned to client
   */
function checkname(name) {
  var check = /^[A-Za-z]{3,15}$/;
  return check.test(name);
}
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {boolean} returned to client
   */
function checkUsername(name) {
  var check = /^[A-Za-z0-9_-]{3,15}$/;
  return check.test(name);
}
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 6 To 15
   * @param {string} text
   * @returns {boolean} returned to client
   */
function checkPassword(text) {
  var check = /^[.A-Za-z0-9_-]{6,15}$/;
  return check.test(text);
}
/**
   * Checks input and returns false if characters
   * include blank spaces
   * @param {text} text
   * @returns {boolean} returned to client
   */
function checkField(text) {
  var check = /[^\S\r\n]{1,}$/;
  return check.test(text);
}
/**
   * Checks input and returns null if characters
   * include blank spaces
   * @param {text} params
   * @returns {text} returned to client
   */
function returnParameter(params) {
  var check = /[^\S\r\n]{1,}$/;
  if (!check.test(params)) {
    return params;
  }return null;
}
/**
   * Checks input and returns false if non alphanumeric characters are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {string} returned to client
   */
function returnName(name) {
  var check = /^[A-Za-z]{3,15}$/;
  if (check.test(name)) {
    return name;
  }return null;
}
/**
   *Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {string} returned to client
   */
function returnUsername(name) {
  var check = /^[A-Za-z0-9_-]{3,15}$/;
  if (check.test(name)) {
    return name;
  }return null;
}
/**
   * Checks input and returns false if email is invalid
   *
   * @param {string} email
   * @returns {boolean}  returned to client
   */
function returnEmail(email) {
  var check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (check.test(email)) {
    return email;
  }return null;
}
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 6 To 15
   * @param {string} password
   * @returns {boolean} returned to client
   */
function returnPassword(password) {
  var check = /^[.A-Za-z0-9_-]{6,15}$/;
  if (check.test(password)) {
    return password;
  }return null;
}