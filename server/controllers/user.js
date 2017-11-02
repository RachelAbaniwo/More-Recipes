import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './../database/models';
import apiResponse from '../helpers';

/**
 * Controls the user endpoints
 */
export default class UserController {
/**
   * adds a new user to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  userSignUp(req, res) {
    const errors = [];
    if (!req.body.Firstname) {
      errors.push('Firstname is Required!');
    }
    if (!req.body.Lastname) {
      errors.push('Lastname is required!');
    }
    if (!req.body.Username) {
      errors.push('Choose your User Name.');
    }
    if (!req.body.Email) {
      errors.push('Email Address is required!');
    }
    if (!req.body.Password) {
      errors.push('Choose a Password');
    }

    if (errors.length > 0) {
      return apiResponse('fail', 422, { errors, message: 'Please fix the validation errors' }, res);
    }
    console.log(req.body);
    return db.User.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Username: req.body.Username,
      Email: req.body.Email,
      Password: bcrypt.hashSync(req.body.Password, 10) 
    }).then((user) => {
      return apiResponse('success', 200, { user, message: 'Successfully signed up!' }, res);
    }).catch((error) => {
      return apiResponse('fail', 500, { message: error.message }, res);
    });
  }
  /**
   * adds a new user to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  userSignIn(req, res) {
    const errors = [];

    if (!req.body.Username) {
      errors.push('the Username is required');
    }
    if (!req.body.Password) {
      errors.push('the Password is required');
    }
    if (errors.length > 0) {
      return apiResponse('fail', 422, { errors, message: 'Please fix the validation errors' }, res);  
    }
    return db.User.findOne({ where: { Username: req.body.Username } }).then((user) => {
      if (!user) {
        return apiResponse('fail', 422, { message: 'User not found' }, res);
      }
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        const token = jwt.sign(user.get(), 'secret');
        return apiResponse('success', 200, { token, message: 'Successfully signed in.' }, res);
      } return apiResponse('fail', 422, { message: 'Wrong credentials' }, res);
    }).catch(error => apiResponse('fail', 500, { message: error.message }, res));
  }
}