export function checkEmail(email) {
  const check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return check.test(email);
};
/**
   * Checks input and returns false if non alphanumeric characters are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {boolean} returned to client
   */
export function checkname(name) {
  const check = /^[A-Za-z]{3,15}$/;
  return check.test(name);
}
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {boolean} returned to client
   */
export function checkUsername(name) {
  const check = /^[A-Za-z0-9_-]{3,15}$/;
  return check.test(name);
}
/**
   * Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 6 To 15
   * @param {string} text
   * @returns {boolean} returned to client
   */
export function checkPassword(text) {
  const check = /^[.A-Za-z0-9_-]{6,15}$/;
  return check.test(text);
}
/**
   * Checks input and returns false if characters
   * include blank spaces
   * @param {text} text
   * @returns {boolean} returned to client
   */
export function checkField(text) {
  const check = /[^\S\r\n]{1,}$/;
  return check.test(text);
}
/**
   * Checks input and returns null if characters
   * include blank spaces
   * @param {text} params
   * @returns {text} returned to client
   */
export function returnParameter(params) {
  const check = /[^\S\r\n]{1,}$/;
  if (!check.test(params)) {
    return params;
  } return null;
}
/**
   * Checks input and returns false if non alphanumeric characters are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {string} returned to client
   */
export function returnName(name) {
  const check = /^[A-Za-z]{3,15}$/;
  if (check.test(name)) {
    return name;
  } return null;
}
/**
   *Checks input and returns false if characters beside
   * alphanumeric characters, _ and - are inputed
   * Number of Characters must be from 3 To 5
   * @param {string} name
   * @returns {string} returned to client
   */
export function returnUsername(name) {
  const check = /^[A-Za-z0-9_-]{3,15}$/;
  if (check.test(name)) {
    return name;
  } return null;
}
export function returnEmail(email) {
  const check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (check.test(email)) {
    return email;
  } return null;
}
export function returnPassword(password) {
  const check = /^[.A-Za-z0-9_-]{6,15}$/;
  if (check.test(password)) {
    return password;
  } return null;
}