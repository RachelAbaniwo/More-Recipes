/**
  * Checks email input and returns false if email is invalid
  * @param {string} email
  *
  * @returns {boolean} returned to client
*/
export const checkEmail = (email) => {
  const check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return check.test(email);
};
/**
  * Checks input and returns false if non alphanumeric characters are inputed
  * Number of Characters must be from 3 To 5
  * @param {string} name
  *
  * @returns {boolean} returned to client
*/
export const checkname = (name) => {
  const check = /^[A-Za-z0-9]{3,15}$/;
  return check.test(name);
};
/**
  * Checks input and returns false if characters beside
  * alphanumeric characters, _ and - are inputed
  * Number of Characters must be from 3 To 5
  * @param {string} name
  *
  * @returns {boolean} returned to client
*/
export const checkUsername = (name) => {
  const check = /^[A-Za-z0-9_-]{3,15}$/;
  return check.test(name);
};
/**
  * Checks input and returns false if characters beside
  * alphanumeric characters, _ and - are inputed
  * Number of Characters must be from 6 To 15
  * @param {string} text
  *
  * @returns {boolean} returned to client
*/
export const checkPassword = (text) => {
  const check = /^[.A-Za-z0-9_-]{6,15}$/;
  return check.test(text);
};
/**
  * Checks input and returns true if characters
  * include blank spaces
  * @param {text} text
  *
  * @returns {boolean} returned to client
*/
export const checkField = (text) => {
  const check = /[^\S\r\n]{1,}$/;
  return check.test(text);
};
/**
  * Checks input and returns null if characters
  * include blank spaces
  * @param {text} text
  *
  * @returns {text} returned to client
*/
export const returnParameter = (text) => {
  const check = /[^\S\r\n]{1,}$/;
  if (!check.test(text)) {
    return text;
  } return null;
};
/**
  * Checks input and returns nullif non alphanumeric characters are inputed
  * Number of Characters must be from 3 To 5
  * @param {string} name
  *
  * @returns {string} returned to client
*/
export const returnName = (name) => {
  const check = /^[A-Za-z0-9]{3,15}$/;
  if (check.test(name)) {
    return name;
  } return null;
};
/**
  *Checks input and returns null if characters that are not
  * alphanumeric characters, _ and - are inputed
  * number of Characters must be from 3 To 5
  * @param {string} name
  *
  * @returns {string} returned to client
*/
export const returnUsername = (name) => {
  const check = /^[A-Za-z0-9_-]{3,15}$/;
  if (check.test(name)) {
    return name;
  } return null;
};
