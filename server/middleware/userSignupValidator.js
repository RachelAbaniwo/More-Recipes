import { checkEmail, checkname, checkUsername, checkPassword } from '../helpers/checkInput';


export default (req, res, next) => {
  const errors = [];
  if (!req.body.firstname) {
    errors.push('First name is Required!');
  }
  if (req.body.firstname && req.body.firstname.length < 3) {
    errors.push('Your first name should have a minimum of 3 characters');
  }
  if ((req.body.firstname) && (req.body.firstname.length >= 3) &&
    (!checkname(req.body.firstname))) {
    errors.push('First name should include letters only');
  }
  if (!req.body.lastname) {
    errors.push('Last name is Required!');
  }
  if (req.body.lastname && req.body.lastname.length < 3) {
    errors.push('Your last name should have a minimum of 3 characters');
  }
  if ((req.body.lastname) && (req.body.lastname.length >= 3) &&
  (!checkname(req.body.firstname))) {
    errors.push('Last name should include letters only');
  }
  if (!req.body.username) {
    errors.push('Choose a user name!');
  }
  if (req.body.username && req.body.username.length < 3) {
    errors.push('Your user name should have a minimum of 3 characters');
  }
  if ((req.body.username) && (req.body.username.length >= 3) &&
  (!checkUsername(req.body.username))) {
    errors.push('Username should include only ( letters, numbers, - and _ )');
  }
  if (!req.body.email) {
    errors.push('Email Address is Required!');
  }
  if ((req.body.email) && (!checkEmail(req.body.email))) {
    errors.push('Email format is wrong, enter valid email address');
  }
  if (!req.body.password) {
    errors.push('Choose a password');
  }
  if ((req.body.password) && (req.body.password.length < 6)) {
    errors.push('Your password should have a minimum of 6 characters');
  }
  if ((req.body.password) && (req.body.password.length >= 6) &&
   (!checkPassword(req.body.password))) {
    errors.push('Password should only include ( letters, numbers, -, _, and . )');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      errors,
      message: 'Please fix the validation errors'
    });
  }
  next();
};
