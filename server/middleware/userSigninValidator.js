import { checkEmail } from '../helpers/checkInput';

export default (req, res, next) => {
  const errors = [];
  if (!req.body.email) {
    errors.push('Email Address is required!');
  }
  if ((req.body.email) && (!checkEmail(req.body.email))) {
    errors.push('Email format is wrong, enter valid email address');
  }
  if (!req.body.password) {
    errors.push('Password is required!');
  }
  if (errors.length > 0) {
    return res.status(400).json({ errors, message: 'Please fix the validation errors' });
  }
  next();
};
