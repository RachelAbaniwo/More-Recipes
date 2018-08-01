import { checkEmail, checkname, checkUsername, checkPassword } from '../helpers/checkInput';


export default (request, response, next) => {
  const errors = [];
  if (!request.body.firstname) {
    errors.push('First name is required!');
  }
  if (request.body.firstname && request.body.firstname.length < 3) {
    errors.push('Your first name should have a minimum of 3 characters');
  }
  if ((request.body.firstname) && (request.body.firstname.length >= 3) &&
    (!checkname(request.body.firstname))) {
    errors.push('First name should include letters only');
  }
  if (!request.body.lastname) {
    errors.push('Last name is required!');
  }
  if (request.body.lastname && request.body.lastname.length < 3) {
    errors.push('Your last name should have a minimum of 3 characters');
  }
  if ((request.body.lastname) && (request.body.lastname.length >= 3) &&
  (!checkname(request.body.lastname))) {
    errors.push('Last name should include letters only');
  }
  if (!request.body.username) {
    errors.push('Choose a user name!');
  }
  if (request.body.username && request.body.username.length < 3) {
    errors.push('Your user name should have a minimum of 3 characters');
  }
  if ((request.body.username) && (request.body.username.length >= 3) &&
  (!checkUsername(request.body.username))) {
    errors.push('Username should include only ( letters, numbers, - and _ )');
  }
  if (!request.body.email) {
    errors.push('Email Address is required!');
  }
  if ((request.body.email) && (!checkEmail(request.body.email))) {
    errors.push('Email format is wrong, enter valid email address');
  }
  if (!request.body.password) {
    errors.push('Choose a password');
  }
  if ((request.body.password) && (request.body.password.length < 6)) {
    errors.push('Your password should have a minimum of 6 characters');
  }
  if ((request.body.password) && (request.body.password.length >= 6) &&
   (!checkPassword(request.body.password))) {
    errors.push('Password should only include ( letters, numbers, -, _, and . )');
  }

  if (errors.length > 0) {
    return response.status(400).json({
      errors,
      message: 'Please fix the validation errors'
    });
  }
  next();
};
