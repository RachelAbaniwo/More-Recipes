import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';


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
      errors.push('First name is Required!');
    }
    if (!req.body.Lastname) {
      errors.push('Last name is Required!');
    }
    if (!req.body.Username) {
      errors.push('Choose your User Name.');
    }
    if (!req.body.Email) {
      errors.push('Email Address is Required!');
    }
    if (!req.body.Password) {
      errors.push('Choose a Password');
    }

    if (errors.length > 0) {
      return res.status(422).json({
        errors,
        message: 'Please fix the validation errors'
      });
    }

    db.User.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Username: req.body.Username,
      Email: req.body.Email,
      Password: bcrypt.hashSync(req.body.Password, 10)
    }).then((user) => {
      const createdUser = {
        firstname: user.Firstname
      };
      const token = jwt.sign(user.get(), 'secret');
      res.status(201).json({
        createdUser,
        token
      });
    }).catch((error) => {
      res.status(422).json({
        error: error.message
      });
    });
  }
  /**
   * signs user in
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  userSignIn(req, res) {
    const errors = [];

    if (!req.body.Username) {
      errors.push('Username is required');
    }
    if (!req.body.Password) {
      errors.push('Password is required');
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors, message: 'Please fix the validation errors' });
    }
    return db.User.findOne({ where: { Username: req.body.Username } }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Wrong credentials' });
      }
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        const token = jwt.sign(user.get(), 'secret');
        return res.status(201).json({ user, token });
      }

      return res.status(404).json({ message: 'Wrong credentials' });
    }).catch((error) => {
      res.status(500).json({
        message: error.message
      });
    });
  }
}

// update user, delete user, find user. token, exclude pword, delete review,
// update review,delete from favorites, middle ware for long if statements, check for empty
// fields for update user and update recipe, add image, eagerloading, id-uiid,view reviews
// token expiry
// "pretest": "npm run cleardb && NODE_ENV=test sequelize db:migrate && NODE_ENV=test sequelize db:seed:all",

