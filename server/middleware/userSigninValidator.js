import { checkEmail } from '../helpers/checkInput';

export default (request, response, next) => {
  const errors = [];
  if (!request.body.email) {
    errors.push('Email Address is required!');
  }
  if ((request.body.email) && (!checkEmail(request.body.email))) {
    errors.push('Email format is wrong, enter valid email address');
  }
  if (!request.body.password) {
    errors.push('Password is required!');
  }
  if (errors.length > 0) {
    return response.status(400).json({ errors, message: 'Please fix the validation errors' });
  }
  next();
};
